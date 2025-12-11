// ============================================
// SIMULATION WORKER (Web Worker)
// Handles the heavy lifting of lottery simulation off the main thread.
// ============================================

let isRunning = false;
let currentRules = null;
let userSelection = null; // Set of numbers
let userExtraSelection = null; // Set of numbers
let speedMultiplier = 1;

// Statistics
let stats = {
    draws: 0,
    money: 0,
    match3: 0,
    match4: 0,
    match5: 0,
    years: 0
};

self.onmessage = function (e) {
    const data = e.data;

    switch (data.command) {
        case 'start':
            if (!currentRules || !userSelection) return;
            isRunning = true;
            resetStats();
            runSimulationLoop();
            break;

        case 'stop':
            isRunning = false;
            break;

        case 'configure':
            currentRules = data.rules;
            userSelection = new Set(data.userSelection);
            userExtraSelection = new Set(data.userExtraSelection);
            limits = data.limits || { money: 0, years: 0 };
            break;

        case 'set_speed':
            speedMultiplier = data.speed;
            break;
    }
};

function resetStats() {
    stats = {
        draws: 0,
        money: 0,
        match3: 0,
        match4: 0,
        match5: 0,
        years: 0
    };
}

function generateRandomSet(max, count) {
    const s = new Set();
    while (s.size < count) s.add(Math.floor(Math.random() * max) + 1);
    return s;
}

function runSimulationLoop() {
    if (!isRunning) return;

    const baseBatchSize = 5;
    const timeLimit = 12; // ms target for frame budget
    const startTime = performance.now();

    let iterationsPerFrame = Math.floor(baseBatchSize * speedMultiplier);
    if (iterationsPerFrame < 1) iterationsPerFrame = 1;

    let i = 0;
    let bestBatchDraw = null;
    let bestMatchCount = -1;

    // We will send an update to main thread periodically, not every frame to save overhead?
    // Actually, Main thread needs to render updates associated with requestAnimationFrame.
    // In a worker, we usually use setInterval or a tight loop with postMessage.
    // To keep it synced with UI refresh rate roughly, we can just loop and postMessage.

    // However, uncontrolled loop might flood the main thread. 
    // Better approach: Calculate a chunk, post results, use setTimeout to yield.

    while (i < iterationsPerFrame && isRunning) {
        stats.draws++;
        stats.money += currentRules.price;

        // Determine draw count (special case for On Numara)
        const drawCount = currentRules.gameKey === 'onnumara' ? 22 : currentRules.pick;
        const draw = generateRandomSet(currentRules.max, drawCount);

        // Check matches
        let matchCount = 0;
        userSelection.forEach(num => { if (draw.has(num)) matchCount++; });

        let extraMatch = false;
        if (currentRules.hasExtra) {
            const extraDraw = generateRandomSet(currentRules.extraMax, currentRules.extraPick);
            // Assuming single extra pick for now as per config
            if (extraDraw.has(Array.from(userExtraSelection)[0])) extraMatch = true;
        }

        // Track best draw in this batch for visualization
        if (matchCount > bestMatchCount) {
            bestMatchCount = matchCount;
            bestBatchDraw = draw;
        }

        // Update stats
        if (matchCount === 3) stats.match3++;
        if (matchCount === 4) stats.match4++;
        if (matchCount === 5) stats.match5++;

        // Check Win Condition
        let won = false;
        if (currentRules.gameKey === 'sayisal' && matchCount === 6) won = true;
        if (currentRules.gameKey === 'super' && matchCount === 6) won = true;
        if (currentRules.gameKey === 'sanstopu' && matchCount === 5 && extraMatch) won = true;
        if (currentRules.gameKey === 'onnumara' && matchCount === 10) won = true;
        if ((currentRules.gameKey === 'megamillions' || currentRules.gameKey === 'powerball') && matchCount === 5 && extraMatch) won = true;

        if (won) {
            isRunning = false;
            self.postMessage({
                type: 'win',
                stats: stats,
                draw: Array.from(bestBatchDraw)
            });
            return;
        }

        // Check Limits
        if (limits.money > 0 && stats.money >= limits.money) {
            isRunning = false;
            self.postMessage({ type: 'limit_reached', reason: 'money', stats: stats });
            return;
        }
        if (limits.years > 0 && stats.years >= limits.years) {
            isRunning = false;
            self.postMessage({ type: 'limit_reached', reason: 'years', stats: stats });
            return;
        }

        i++;
        // Yield check every 500 iterations to not block the worker completely if speed is huge
        if (i % 500 === 0) {
            if (performance.now() - startTime > 15) {
                // Determine we spent enough time, let's break and send update
                break;
            }
        }
    }

    stats.years = Math.floor(stats.draws / 52);

    // Send Progress Update
    self.postMessage({
        type: 'update',
        stats: stats,
        draw: bestBatchDraw ? Array.from(bestBatchDraw) : null
    });

    // Schedule next batch
    if (isRunning) {
        // Use setTimeout to allow message processing and not freeze browser even in worker
        setTimeout(runSimulationLoop, 0);
    }
}
