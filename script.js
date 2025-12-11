// ============================================
// ŞANS OYUNLARI SİMÜLASYONU
// IMPOSSIBILITY ENGINE v3.3 (Optimization: Time-Based Chart Update + Low Speed Base)
// ============================================

// --------------------------------------------
// 1. LOCALIZATION & CONFIGURATION
// --------------------------------------------

let currentLang = 'tr';

const i18n = {
    tr: {
        subtitle: "Şans oyunlarında kazanmanın ne kadar sürdüğünü (veya sürmediğini) görün.",
        games: {
            sayisal: "Çılgın Sayısal",
            super: "Süper Loto",
            sanstopu: "Şans Topu",
            onnumara: "On Numara",
            millipiyango: "Milli Piyango",
            megamillions: "Mega Millions",
            powerball: "Powerball"
        },
        gameInfo: {
            sayisal: "90 top, 6 seçim. Şans faktörü en yüksek oyun. Asla tutmaz.",
            super: "60 top, 6 seçim. Klasik model, yüksek varyans.",
            sanstopu: "34+14 top. 5+1 formatı. Olasılıklar biraz daha insaflı.",
            onnumara: "80 toptan 22'si çekilir. 0 BİLEN DE KAZANIR! (İlginç kural).",
            millipiyango: "100.000 bilet, sadece 1 kazanan. Klasik talih oyunu. Bilet numarası 6 haneli.",
            megamillions: "ABD Efsanesi. 5+1 format. Jackpotlar milyar doları bulur ama TL ile oynamak cep yakar ($5).",
            powerball: "ABD Devi. 5+1 format. $2 giriş ücretiyle nispeten 'ekonomik' bir hayal."
        },
        rules: {
            normal: "{pick} sayı (1-{max}) seçin",
            extra: "{pick} sayı (1-{max}) + {extraPick} Joker (1-{extraMax}) seçin"
        },
        ui: {
            random: "Rastgele Doldur",
            start: "SİMÜLASYONU BAŞLAT",
            stop: "Pes Et",
            timeElapsed: "Geçen Süre",
            drawCount: "Yapılan Çekiliş",
            money: "Harcanan Para",
            opportunity: "ŞU AN ALABİLİRDİNİZ:",
            lastDraw: "Son Çekiliş",
            yourCoupon: "SİZİN KUPONUNUZ",
            drawStream: "ÇEKİLİŞ AKIŞI",
            matchKey: "Bilen",
            status: "Hala kazanamadınız...",
            year: "Yıl",
            week: "Hafta",
            humanLife: "İnsan Ömrü",
            minWage: "x Asgari Ücret",
            congrats: "TEBRİKLER! (?)",
            winMessage: "Tam <strong>{draws}</strong> çekiliş sonra,<br>yaklaşık <strong>{years}</strong> sene sonra tutturdunuz!",
            winSub: "Artık hayattaysanız güle güle harcayın.",
            close: "Kapat",
            blogTitle: "Gerçekler Kütüphanesi",
            partialReport: "AMORTİ RAPORU",
            shareBtn: "📤 Sonucu Paylaş",
            shareMsg: "{years} yıl boyunca {game} oynadım ve {money} harcadım. Sonuç? Hâlâ zengin değilim. Sen de dene: ",
            chartTitle: "Kümülatif Zarar (TL)"
        },
        timeTrivia: [
            { years: 0, text: "Günümüz" },
            { years: 100, text: "Osmanlı'nın Son Dönemi" },
            { years: 570, text: "İstanbul'un Fethi" },
            { years: 1000, text: "Orta Çağ / Haçlı Seferleri" },
            { years: 2000, text: "Roma İmparatorluğu Dönemi" },
            { years: 3000, text: "Piramitlerin İnşası" },
            { years: 10000, text: "Cilalı Taş Devri" },
            { years: 12000, text: "Son Buzul Çağı" },
            { years: 300000, text: "İlk İnsanlar (Homo Sapiens)" },
            { years: 2500000, text: "Taş Devri Başlangıcı" },
            { years: 65000000, text: "Dinozorların Yok Oluşu" },
            { years: 4500000000, text: "Dünya'nın Oluşumu" }
        ],
        blog: [
            {
                title: "Sayısal Loto'yu Neden Asla Kazanamazsınız?",
                desc: "Matematiksel kanıtlar ve olasılık teorisi ışığında, büyük ikramiyenin neden size çıkmayacağının bilimsel açıklaması.",
                link: "blog/loto-matematiksel-imkansizlik.html",
                btn: "Okumaya Başla →"
            },
            {
                title: "Görünmez İflas: Küçük Harcamaların Büyük Yıkımı",
                desc: "\"Haftada bir kolon\" diyerek neleri kaybettiğinizi hiç hesapladınız mı? Fırsat maliyeti ve finansal özgürlük üzerine bir analiz.",
                link: "blog/sans-oyunlari-finansal-gercekler.html",
                btn: "Gerçeklerle Yüzleş →"
            }
        ]
    },
    en: {
        subtitle: "See how long it takes (or doesn't take) to win lottery games.",
        games: {
            sayisal: "Crazy Lotto (6/90)",
            super: "Super Lotto (6/60)",
            sanstopu: "Lucky Ball (5+1)",
            onnumara: "Number Ten (10/80)",
            millipiyango: "National Lottery",
            megamillions: "Mega Millions (US)",
            powerball: "Powerball (US)"
        },
        gameInfo: {
            sayisal: "90 balls, pick 6. Highest variance. Impossible to win.",
            super: "60 balls, pick 6. Classic model, standard impossibility.",
            sanstopu: "34+14 balls. 5+1 format. Slightly better odds.",
            onnumara: "22 drawn from 80. MATCHING 0 ALSO WINS! (Unique rule).",
            millipiyango: "100,000 tickets, only 1 winner. Classic raffle. 6-digit ticket number.",
            megamillions: "US Legend. 5+1 format. Huge jackpots, expensive to fail ($5).",
            powerball: "US Giant. 5+1 format. $2 entry makes the impossible slightly cheaper."
        },
        rules: {
            normal: "Pick {pick} numbers (1-{max})",
            extra: "Pick {pick} numbers (1-{max}) + {extraPick} Joker (1-{extraMax})"
        },
        ui: {
            random: "Random Fill",
            start: "START SIMULATION",
            stop: "Give Up",
            timeElapsed: "Time Elapsed",
            drawCount: "Draws",
            money: "Money Spent",
            opportunity: "YOU COULD HAVE BOUGHT:",
            lastDraw: "Last Draw",
            yourCoupon: "YOUR COUPON",
            drawStream: "DRAW STREAM",
            matchKey: "Mtch",
            status: "Still not winning...",
            year: "Yrs",
            week: "Wks",
            humanLife: "Lives",
            minWage: "x MinWage",
            congrats: "CONGRATULATIONS! (?)",
            winMessage: "You won after exactly <strong>{draws}</strong> draws,<br>approx <strong>{years}</strong> years later!",
            winSub: "Spend it wisely if you are still alive.",
            close: "Close",
            blogTitle: "Library of Truth",
            partialReport: "PARTIAL WINS REPORT",
            shareBtn: "📤 Share Result",
            shareMsg: "I played {game} for {years} years and spent {money}. Result? Still broke. Try yourself: ",
            chartTitle: "Cumulative Loss"
        },
        timeTrivia: [
            { years: 0, text: "Present Day" },
            { years: 100, text: "Titanic / WW1 Era" },
            { years: 500, text: "Discovery of America" },
            { years: 1000, text: "Middle Ages" },
            { years: 2000, text: "Roman Empire" },
            { years: 3000, text: "Building of Pyramids" },
            { years: 10000, text: "Neolithic Revolution" },
            { years: 12000, text: "Last Ice Age" },
            { years: 300000, text: "First Humans (Homo Sapiens)" },
            { years: 2500000, text: "Stone Age Begins" },
            { years: 65000000, text: "Extinction of Dinosaurs" },
            { years: 4500000000, text: "Formation of Earth" }
        ],
        blog: [
            {
                title: "Why You Will Never Win the Lottery",
                desc: "Scientific explanation of why the jackpot will never be yours, in the light of mathematical proofs and probability theory.",
                link: "blog/lottery-mathematical-impossibility.html",
                btn: "Start Reading →"
            },
            {
                title: "Invisible Bankruptcy: The Cost of Gambling",
                desc: "Have you ever calculated what you lose by saying \"just one ticket a week\"? An analysis on opportunity cost and financial freedom.",
                link: "blog/gambling-financial-reality.html",
                btn: "Face the Truth →"
            }
        ]
    }
};

const gamesConfig = {
    sayisal: { name: "Çılgın Sayısal Loto", max: 90, pick: 6, hasExtra: false, extraMax: 0, extraPick: 0, price: 15, drawsPerYear: 156 }, // 3 days/week
    super: { name: "Süper Loto", max: 60, pick: 6, hasExtra: false, extraMax: 0, extraPick: 0, price: 10, drawsPerYear: 156 }, // 3 days/week
    sanstopu: { name: "Şans Topu", max: 34, pick: 5, hasExtra: true, extraMax: 14, extraPick: 1, price: 5, drawsPerYear: 104 }, // 2 days/week
    onnumara: { name: "On Numara", max: 80, pick: 10, hasExtra: false, extraMax: 0, extraPick: 0, price: 5, drawsPerYear: 104 }, // 2 days/week
    millipiyango: { name: "Milli Piyango", max: 999999, pick: 1, hasExtra: false, extraMax: 0, extraPick: 0, price: 500, isRaffle: true, drawsPerYear: 34 }, // 9,19,29 checks - Dec + New Year
    megamillions: { name: "Mega Millions", max: 70, pick: 5, hasExtra: true, extraMax: 25, extraPick: 1, price: 175, drawsPerYear: 104 }, // 2 days/week
    powerball: { name: "Powerball", max: 69, pick: 5, hasExtra: true, extraMax: 26, extraPick: 1, price: 70, drawsPerYear: 156 } // 3 days/week
};

// --------------------------------------------
// 2. ANIMATION SYSTEMS
// --------------------------------------------

class ConfettiCelebration {
    constructor() {
        this.container = document.getElementById('confetti-container');
        this.colors = ['#00ff88', '#00d4ff', '#ffd700', '#ff6b6b', '#a855f7', '#ffffff'];
        this.shapes = ['square', 'circle', 'triangle'];
    }
    launch(count = 150) {
        if (!this.container) return;
        for (let i = 0; i < count; i++) setTimeout(() => this.createConfetti(), i * 20);
    }
    createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        confetti.style.cssText = `left: ${left}%; width: ${size}px; height: ${size}px; background: ${color}; animation-duration: ${animDuration}s; animation-delay: ${delay}s; ${shape === 'circle' ? 'border-radius: 50%;' : ''} ${shape === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}`;
        this.container.appendChild(confetti);
        setTimeout(() => confetti.remove(), (animDuration + delay) * 1000);
    }
}

class FloatingParticles {
    constructor() {
        this.container = document.getElementById('particles-container');
        this.particles = [];
        this.maxParticles = 25;
    }
    init() {
        for (let i = 0; i < this.maxParticles; i++) setTimeout(() => this.createParticle(), i * 200);
        setInterval(() => { if (this.particles.length < this.maxParticles) this.createParticle(); }, 2000);
    }
    createParticle() {
        if (!this.container) return;
        const particle = document.createElement('div');
        particle.className = 'particle';
        const colors = ['#00ff88', '#00d4ff', '#a855f7'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        particle.style.cssText = `left: ${left}%; width: ${size}px; height: ${size}px; background: ${color}; box-shadow: 0 0 ${size * 2}px ${color}; animation-duration: ${duration}s; animation-delay: ${delay}s;`;
        this.container.appendChild(particle);
        this.particles.push(particle);
        setTimeout(() => { particle.remove(); this.particles = this.particles.filter(p => p !== particle); }, (duration + delay) * 1000);
    }
}

class LoadingOverlay {
    constructor() {
        this.overlay = document.getElementById('loadingOverlay');
        this.textEl = this.overlay?.querySelector('.loading-text');
    }
    show(text = 'Simülasyon Başlatılıyor...') {
        if (!this.overlay) return;
        if (this.textEl) this.textEl.textContent = text;
        this.overlay.classList.remove('hidden');
    }
    hide() { if (!this.overlay) return; this.overlay.classList.add('hidden'); }
}

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.initialized = false;
    }
    init() {
        if (this.initialized) return;
        try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); this.initialized = true; } catch (e) { console.warn('Audio not supported'); }
    }
    async play(type) {
        if (!this.ctx) return;
        try {
            if (this.ctx.state === 'suspended') await this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            const now = this.ctx.currentTime;

            switch (type) {
                case 'select':
                    osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
                    gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                    osc.start(now); osc.stop(now + 0.15); break;
                case 'deselect':
                    osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                    gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    osc.start(now); osc.stop(now + 0.1); break;
                case 'start':
                    osc.frequency.setValueAtTime(300, now); osc.frequency.linearRampToValueAtTime(900, now + 0.4);
                    gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                    osc.start(now); osc.stop(now + 0.5); break;
                case 'win':
                    this.playNote(523.25, 0, 0.2); this.playNote(659.25, 0.15, 0.2); this.playNote(783.99, 0.3, 0.2); this.playNote(1046.5, 0.45, 0.4); break;
            }
        } catch (e) { console.error(e); }
    }
    playNote(freq, delay, duration) {
        const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain(); osc.connect(gain); gain.connect(this.ctx.destination);
        const now = this.ctx.currentTime + delay; osc.type = 'triangle'; osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.start(now); osc.stop(now + duration);
    }
}

// --------------------------------------------
// 3. GAME SIMULATION ENGINE (MULTI-INSTANCE)
// --------------------------------------------

class SimulationInstance {

    constructor(gameKey) {
        this.gameKey = gameKey;
        this.rules = gamesConfig[gameKey];
        this.isRunning = false;
        this.userSelection = new Set();
        this.userExtraSelection = new Set();
        this.userExtraSelection = new Set();
        this.stats = { draws: 0, money: 0, match3: 0, match4: 0, match5: 0, years: 0, amorti: 0 };
        this.loopId = null; // Back to main thread loop
        this.widgetEl = null;
        this.chartData = [];
        this.lastChartUpdateTime = 0;
        this.limits = {}; // Store limits
    }

    start(limits = {}) {
        if (this.isRunning) return;
        this.isRunning = true;
        this.limits = limits;
        this.runLoop();
    }

    stop() {
        this.isRunning = false;
        if (this.loopId) cancelAnimationFrame(this.loopId);
        if (this.widgetEl) { this.widgetEl.remove(); this.widgetEl = null; }
    }

    runLoop() {
        const baseBatchSize = 5;

        const loop = () => {
            if (!this.isRunning) return;

            const startTime = performance.now();
            const timeLimit = 12; // ms budget

            let iterationsPerFrame = Math.floor(baseBatchSize * speedMultiplier);
            if (iterationsPerFrame < 1) iterationsPerFrame = 1;

            let i = 0;
            let bestBatchDraw = null;
            let bestMatchCount = -1;

            while (i < iterationsPerFrame) {
                this.stats.draws++;
                this.stats.money += this.rules.price;

                const drawCount = this.gameKey === 'onnumara' ? 22 : this.rules.pick;
                // For Raffle, draw generation is handled differently below
                let draw = null;
                let matchCount = 0;

                if (!this.rules.isRaffle) {
                    draw = generateRandomSet(this.rules.max, drawCount);
                    this.userSelection.forEach(num => { if (draw.has(num)) matchCount++; });
                }

                let extraMatch = false;
                if (this.rules.hasExtra) {
                    const extraDraw = generateRandomSet(this.rules.extraMax, this.rules.extraPick);
                    if (extraDraw.has(Array.from(this.userExtraSelection)[0])) extraMatch = true;
                }

                if (matchCount > bestMatchCount) {
                    bestMatchCount = matchCount;
                    bestBatchDraw = draw;
                }

                if (matchCount === 3) this.stats.match3++;
                if (matchCount === 4) this.stats.match4++;
                if (matchCount === 5) this.stats.match5++;

                let won = false;

                // Special Handling for Milli Piyango (Raffle)
                if (this.gameKey === 'millipiyango') {
                    const winningNumber = Math.floor(Math.random() * 1000000); // 0-999999
                    const amorti1 = Math.floor(Math.random() * 10);
                    let amorti2 = Math.floor(Math.random() * 10);
                    while (amorti2 === amorti1) amorti2 = Math.floor(Math.random() * 10); // Unique amorti digits

                    const userTicket = Array.from(this.userSelection)[0];
                    const userLastDigit = userTicket % 10;

                    // Jackpot Check (Full Match)
                    if (userTicket === winningNumber) {
                        won = true;
                    }
                    // Amorti Check (Last Digit)
                    else if (userLastDigit === amorti1 || userLastDigit === amorti2) {
                        this.stats.match3++; // Using match3 slot for Amorti count
                    }
                    // Teselli Check (Off by one digit implies close call, but strictly it's usually "one digit different")
                    // Simplified Teselli: If 5 digits match (just for simulation sake or strictly off by 1)
                    // Let's implement strict "Teselli": winning number vs user ticket diff is single digit place? 
                    // Or usually simplified: First 5 or last 5 match? 
                    // Let's stick to simple "Close Call" logic for visuals or just track Amorti as the main "partial win".

                    // Passing draw data for dashboard updates needs to be arrays
                    if (matchCount > bestMatchCount) {
                        // For raffle, matchCount concept is different. Let's just use Amorti as a "match"
                        if (userLastDigit === amorti1 || userLastDigit === amorti2) bestMatchCount = 1;
                        bestBatchDraw = new Set([winningNumber]); // Visualize the winning ticker
                    }

                } else {
                    // Standard Lottery Logic
                    if (this.gameKey === 'sayisal' && matchCount === 6) won = true;
                    if (this.gameKey === 'super' && matchCount === 6) won = true;
                    if (this.gameKey === 'sanstopu' && matchCount === 5 && extraMatch) won = true;
                    if (this.gameKey === 'onnumara' && matchCount === 10) won = true;
                    if ((this.gameKey === 'megamillions' || this.gameKey === 'powerball') && matchCount === 5 && extraMatch) won = true;
                }

                if (won) {
                    this.isRunning = false;
                    if (activeGameKey === this.gameKey) {
                        updateDashboard(this, draw);
                        const stream = document.getElementById('drawLogStream');
                        if (stream && stream.firstChild) {
                            stream.firstChild.style.border = "2px solid var(--accent-gold)";
                            stream.firstChild.style.boxShadow = "0 0 15px var(--accent-gold)";
                        }
                    }
                    finishGame(this);
                    return;
                }

                i++;
                // Break if frame budget exceeded (but do at least some iterations)
                if (i % 500 === 0) {
                    if (performance.now() - startTime > timeLimit) break;
                }
            }

            // Calculate years based on specific game frequency
            this.stats.years = Math.floor(this.stats.draws / this.rules.drawsPerYear);

            if (activeGameKey === this.gameKey) {
                updateDashboard(this, bestBatchDraw);
            } else {
                this.updateWidget();
            }

            if (this.isRunning) this.loopId = requestAnimationFrame(loop);
        };

        this.loopId = requestAnimationFrame(loop);
    }

    createWidget() {
        if (this.widgetEl) return;
        const container = document.getElementById('bg-simulations-container');
        if (!container) return;

        const widget = document.createElement('div');
        widget.className = 'bg-sim-widget running';
        widget.dataset.game = this.gameKey;
        widget.innerHTML = `
            <div class="bg-sim-info">
                <span class="bg-sim-title">${this.rules.name}</span>
                <div class="bg-sim-stats">
                    <span id="widget-draws-${this.gameKey}">0 Çekiliş</span> | 
                    <span id="widget-years-${this.gameKey}">0 Yıl</span>
                </div>
            </div>
            <div class="bg-sim-spinner"></div>
        `;
        widget.onclick = () => changeGame(this.gameKey);
        container.appendChild(widget);
        this.widgetEl = widget;
    }

    updateWidget() {
        if (!this.widgetEl) this.createWidget();
        const dEl = document.getElementById(`widget-draws-${this.gameKey}`);
        const yEl = document.getElementById(`widget-years-${this.gameKey}`);
        if (dEl) dEl.textContent = `${this.stats.draws.toLocaleString()} Çekiliş`;
        if (yEl) yEl.textContent = `${this.stats.years} Yıl`;
    }
}

// --------------------------------------------
// 4. GLOBAL STATE
// --------------------------------------------

const simulations = {};
let activeGameKey = 'sayisal';
let confettiSystem, particleSystem, loaderSystem, soundSystem, lossChart;
let speedMultiplier = 1;

// --------------------------------------------
// 5. CORE FUNCTIONS (CHANGE & UPDATE UI)
// --------------------------------------------

function changeGame(newKey) {
    if (!simulations[newKey]) return;

    if (simulations[activeGameKey]) {
        const prevInstance = simulations[activeGameKey];
        if (prevInstance.isRunning) prevInstance.createWidget();
    }

    activeGameKey = newKey;
    const newInstance = simulations[newKey];

    if (newInstance.widgetEl) {
        newInstance.widgetEl.remove();
        newInstance.widgetEl = null;
    }

    updateGameUI(newInstance);
}

function updateGameUI(instance) {
    updateTexts();

    document.querySelectorAll('.game-btn').forEach(btn => {
        if (btn.dataset.game === instance.gameKey) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    const gameArea = document.querySelector('.game-area');
    const dashboard = document.getElementById('simulationDashboard');

    if (instance.isRunning) {
        gameArea.classList.add('hidden');
        dashboard.classList.remove('hidden');
        renderFixedCoupon(instance);
        initializeChart();
    } else {
        gameArea.classList.remove('hidden');
        dashboard.classList.add('hidden');

        const grid = document.getElementById('numberGrid');
        const extraGrid = document.getElementById('extraGrid');

        renderGrid(grid, instance.rules.max, instance.userSelection, instance.rules.pick, instance.gameKey);

        if (instance.rules.hasExtra) {
            extraGrid.classList.remove('hidden');
            renderGrid(extraGrid, instance.rules.extraMax, instance.userExtraSelection, instance.rules.extraPick, instance.gameKey, true);
        } else {
            extraGrid.classList.add('hidden');
        }
    }
}

function updateTexts() {
    const t = i18n[currentLang];
    const instance = simulations[activeGameKey];

    document.getElementById('appSubtitle').textContent = t.subtitle;
    document.querySelectorAll('.game-btn').forEach(btn => btn.textContent = t.games[btn.dataset.game]);
    document.getElementById('randomBtn').textContent = t.ui.random;
    document.getElementById('startBtn').textContent = t.ui.start;
    document.getElementById('stopBtn').textContent = t.ui.stop;
    document.getElementById('closeModal').textContent = t.ui.close;
    document.getElementById('shareBtn').textContent = t.ui.shareBtn;

    const statusMsg = document.getElementById('statusMessage');
    if (statusMsg && !statusMsg.textContent.includes("Pes") && !statusMsg.textContent.includes("Give")) {
        statusMsg.textContent = t.ui.status;
    }

    document.querySelector('#winnerModal h2').textContent = t.ui.congrats;
    document.querySelector('#winnerModal p').textContent = t.ui.winSub;

    const blogSection = document.querySelector('.blog-section');
    if (blogSection) {
        blogSection.querySelector('h3').textContent = t.ui.blogTitle;
        const cards = blogSection.querySelectorAll('.blog-card');
        if (cards.length >= 2) {
            cards[0].href = t.blog[0].link;
            cards[0].querySelector('h4').textContent = t.blog[0].title;
            cards[0].querySelector('p').textContent = t.blog[0].desc;
            cards[0].querySelector('.read-more').textContent = t.blog[0].btn;

            cards[1].href = t.blog[1].link;
            cards[1].querySelector('h4').textContent = t.blog[1].title;
            cards[1].querySelector('p').textContent = t.blog[1].desc;
            cards[1].querySelector('.read-more').textContent = t.blog[1].btn;
        }
    }

    const statLabels = document.querySelectorAll('.stat-card .label');
    if (statLabels.length >= 3) {
        statLabels[0].textContent = t.ui.timeElapsed;
        statLabels[1].textContent = t.ui.drawCount;
        statLabels[2].textContent = t.ui.money;
    }

    const panelHeader = document.querySelector('.panel-header span');
    if (panelHeader) panelHeader.textContent = t.ui.yourCoupon;
    const streamHeader = document.querySelector('.secondary-header span');
    if (streamHeader) streamHeader.textContent = t.ui.drawStream;

    const partialHeader = document.querySelector('.partial-stats-box .label');
    if (partialHeader) partialHeader.textContent = t.ui.partialReport;

    const ruleEl = document.getElementById('rulesInfo');
    const desc = t.gameInfo ? `<br><span style="font-size:0.9em; opacity:0.8; color:var(--text-secondary)">${t.gameInfo[instance.gameKey]}</span>` : '';

    if (instance.rules.hasExtra) {
        ruleEl.innerHTML = t.rules.extra
            .replace('{pick}', instance.rules.pick).replace('{max}', instance.rules.max)
            .replace('{extraPick}', instance.rules.extraPick).replace('{extraMax}', instance.rules.extraMax) + desc;
    } else {
        ruleEl.innerHTML = t.rules.normal
            .replace('{pick}', instance.rules.pick).replace('{max}', instance.rules.max) + desc;
    }
}

// --------------------------------------------
// 6. HELPER FUNCTIONS
// --------------------------------------------

function renderGrid(container, max, selectionSet, limit, gameKey, isExtra = false) {
    container.innerHTML = '';

    // Special handling for Milli Piyango (raffle-style)
    if (gamesConfig[gameKey]?.isRaffle) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'raffle-input';
        input.placeholder = 'Bilet Numaranız (6 haneli)';
        input.maxLength = 6;
        input.value = selectionSet.size > 0 ? String(Array.from(selectionSet)[0]).padStart(6, '0') : '';
        input.oninput = (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            if (e.target.value.length === 6) {
                selectionSet.clear();
                selectionSet.add(parseInt(e.target.value));
            } else {
                selectionSet.clear();
            }
        };
        container.appendChild(input);
        return;
    }

    // Normal grid for other games
    for (let i = 1; i <= max; i++) {
        const cell = document.createElement('div');
        cell.className = 'num-cell';
        if (selectionSet.has(i)) cell.classList.add('selected');
        cell.textContent = i;
        cell.onclick = () => {
            if (selectionSet.has(i)) {
                selectionSet.delete(i);
                cell.classList.remove('selected');
                if (soundSystem) soundSystem.play('deselect');
            } else {
                if (selectionSet.size < limit) {
                    selectionSet.add(i);
                    cell.classList.add('selected');
                    if (soundSystem) soundSystem.play('select');
                } else {
                    cell.style.animation = 'none'; cell.offsetHeight; cell.style.animation = 'shake 0.5s ease';
                }
            }
        };
        container.appendChild(cell);
    }
}

function renderFixedCoupon(instance) {
    const container = document.getElementById('fixedUserNumbers');
    container.innerHTML = '';

    const nums = Array.from(instance.userSelection).sort((a, b) => a - b);

    if (instance.rules.isRaffle) {
        // Raffle style (Milli Piyango)
        nums.forEach(num => {
            const el = document.createElement('div');
            el.className = 'num-raffle';
            el.textContent = String(num).padStart(6, '0');
            container.appendChild(el);
        });
    } else {
        // Normal ball style
        nums.forEach(num => {
            const el = document.createElement('div');
            el.className = 'num-mini';
            el.textContent = num;
            container.appendChild(el);
        });

        if (instance.rules.hasExtra) {
            Array.from(instance.userExtraSelection).sort((a, b) => a - b).forEach(num => {
                const el = document.createElement('div');
                el.className = 'num-mini';
                el.style.cssText = 'color:var(--accent-gold); border-color:var(--accent-gold); background:transparent; border-width:2px;';
                el.textContent = '+' + num;
                container.appendChild(el);
            });
        }
    }
}

function generateRandomSet(max, count) {
    const s = new Set();
    while (s.size < count) s.add(Math.floor(Math.random() * max) + 1);
    return s;
}

// --------------------------------------------
// 7. CHART & FEATURES
// --------------------------------------------

function initializeChart() {
    const ctx = document.getElementById('lossChart').getContext('2d');

    if (lossChart) {
        lossChart.destroy();
    }

    lossChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: i18n[currentLang].ui.money,
                data: [],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: true, text: i18n[currentLang].ui.chartTitle, color: '#9ca3af' }
            },
            scales: {
                x: { display: false, grid: { display: false } },
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#6b7280', callback: function (value) { return value.toLocaleString() + '₺'; } }
                }
            },
            animation: false
        }
    });
}

function shareResult() {
    const instance = simulations[activeGameKey];
    const t = i18n[currentLang];

    const msg = t.ui.shareMsg
        .replace('{years}', instance.stats.years)
        .replace('{game}', instance.rules.name)
        .replace('{money}', instance.stats.money.toLocaleString() + '₺')
        + window.location.href;

    // Twitter
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}`;
    window.open(twitterUrl, '_blank');
}

// --------------------------------------------
// 8. ACTION HANDLERS
// --------------------------------------------

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('userLang', lang); // Save preference
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.textContent.toLowerCase() === lang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    updateTexts();
    if (lossChart && simulations[activeGameKey].isRunning) initializeChart();
}

function randomFillCurrent() {
    const instance = simulations[activeGameKey];
    instance.userSelection.clear();
    instance.userExtraSelection.clear();

    // Special handling for Milli Piyango
    if (instance.rules.isRaffle) {
        const randomTicket = Math.floor(Math.random() * 1000000);
        instance.userSelection.add(randomTicket);
    } else {
        while (instance.userSelection.size < instance.rules.pick) {
            instance.userSelection.add(Math.floor(Math.random() * instance.rules.max) + 1);
        }
        if (instance.rules.hasExtra) {
            while (instance.userExtraSelection.size < instance.rules.extraPick) {
                instance.userExtraSelection.add(Math.floor(Math.random() * instance.rules.extraMax) + 1);
            }
        }
    }
    updateGameUI(instance);
    if (soundSystem) soundSystem.play('select');
}

async function startCurrentSimulation() {
    const instance = simulations[activeGameKey];

    if (instance.isRunning) return;

    const pickCheck = instance.userSelection.size === instance.rules.pick;
    const extraCheck = !instance.rules.hasExtra || instance.userExtraSelection.size === instance.rules.extraPick;

    if (!pickCheck || !extraCheck) {
        const btn = document.getElementById('startBtn');
        btn.style.animation = 'none'; btn.offsetHeight; btn.style.animation = 'shake 0.5s ease';
        return;
    }

    if (soundSystem) soundSystem.play('start');
    if (loaderSystem) {
        loaderSystem.show(currentLang === 'tr' ? 'Simülasyon Başlatılıyor...' : 'Starting Simulation...');
        await new Promise(r => setTimeout(r, 800));
        loaderSystem.hide();
    }

    document.getElementById('drawLogStream').innerHTML = '';
    instance.stats = { draws: 0, money: 0, match3: 0, match4: 0, match5: 0, years: 0, amorti: 0 };

    // Reset Chart Data & Init visible
    instance.chartData = [];
    if (lossChart) {
        lossChart.data.labels = [0];
        lossChart.data.datasets[0].data = [0];
        lossChart.update();
    }
    instance.lastChartUpdateTime = performance.now();

    instance.start({});
    updateGameUI(instance);
}

function stopCurrentSimulation() {
    const instance = simulations[activeGameKey];
    instance.stop();
    updateGameUI(instance);
    document.getElementById('statusMessage').textContent = i18n[currentLang].ui.stop + " (Para cebinde kaldı)";
}

function finishGame(instance) {
    if (instance.gameKey !== activeGameKey) changeGame(instance.gameKey);

    const t = i18n[currentLang];
    const modal = document.getElementById('winnerModal');
    const winnerText = document.getElementById('winnerText');

    winnerText.innerHTML = t.ui.winMessage
        .replace('{draws}', instance.stats.draws.toLocaleString())
        .replace('{years}', instance.stats.years);

    modal.classList.remove('hidden');
    if (confettiSystem) { confettiSystem.launch(200); setTimeout(() => confettiSystem.launch(100), 500); }
    if (soundSystem) soundSystem.play('win');
}

function updateDashboard(instance, drawDraw) {
    if (activeGameKey !== instance.gameKey) return;

    const t = i18n[currentLang];

    // Time & Trivia
    let timeText = `${instance.stats.years.toLocaleString()} ${t.ui.year}`;
    let triviaText = "";
    if (instance.stats.years > 0 && t.timeTrivia) {
        const milestones = t.timeTrivia.sort((a, b) => b.years - a.years);
        const match = milestones.find(m => instance.stats.years >= m.years);
        if (match) {
            triviaText = `<br><span class="sub-stat" style="font-size:0.85em; color:var(--text-secondary); display:block; margin-top:4px;">${match.text}</span>`;
        }
    }
    if (instance.stats.years > 0 && instance.stats.years < 100) {
        const generations = (instance.stats.years / 75).toFixed(1);
        triviaText = `<span class="sub-stat">~${generations} ${t.ui.humanLife}</span>`;
    }
    document.getElementById('timeElapsed').innerHTML = timeText + triviaText;

    // Draws & Money
    document.getElementById('drawCount').textContent = instance.stats.draws.toLocaleString();

    const minWage = 17002;
    const minWageCount = (instance.stats.money / minWage).toFixed(1);
    let moneyText = `${instance.stats.money.toLocaleString()} ₺`;
    if (instance.stats.money > minWage) moneyText += `<span class="sub-stat">~${Number(minWageCount).toLocaleString()} ${t.ui.minWage}</span>`;
    document.getElementById('moneySpent').innerHTML = moneyText;

    // Chart Update (Time-based: 200ms throttle)
    const now = performance.now();
    if (lossChart && (now - instance.lastChartUpdateTime > 200)) {
        instance.lastChartUpdateTime = now;
        lossChart.data.labels.push(instance.stats.years);
        lossChart.data.datasets[0].data.push(instance.stats.money);

        if (lossChart.data.labels.length > 50) {
            lossChart.data.labels.shift();
            lossChart.data.datasets[0].data.shift();
        }
        lossChart.update('none');
    }

    // Reality Check
    updateRealityCheck(instance.stats.money, t);

    // Partial Stats
    const pContainer = document.getElementById('partialStats');
    if (pContainer) {
        if (instance.gameKey === 'millipiyango') {
            pContainer.innerHTML = `
                <div class="stat-row"><span>Amorti (Son Rakam)</span><strong>${instance.stats.match3.toLocaleString()}</strong></div>
                <div class="stat-row"><span>Teselli (Son 5)</span><strong>-</strong></div>
                <div class="stat-row"><span>Büyük İkramiye</span><strong>0</strong></div>
            `;
        } else {
            let l1 = `3 ${t.ui.matchKey}`, l2 = `4 ${t.ui.matchKey}`, l3 = `5 ${t.ui.matchKey}`;
            if (instance.gameKey === 'onnumara') { l1 = `0 ${t.ui.matchKey}`; l2 = `6 ${t.ui.matchKey}`; l3 = `9 ${t.ui.matchKey}`; }
            pContainer.innerHTML = `
                <div class="stat-row"><span>${l1}</span><strong>${instance.stats.match3.toLocaleString()}</strong></div>
                <div class="stat-row"><span>${l2}</span><strong>${instance.stats.match4.toLocaleString()}</strong></div>
                <div class="stat-row"><span>${l3}</span><strong>${instance.stats.match5.toLocaleString()}</strong></div>
            `;
        }
    }

    // Stream
    if (drawDraw) addDrawToStream(drawDraw, instance.userSelection);
}

function updateRealityCheck(money, t) {
    const el = document.getElementById('realityCheck');
    const valEl = document.getElementById('opportunityItem');
    const labelEl = document.querySelector('.reality-label');

    const realityItems = [
        { price: 15, nameTR: "1 Ekmek 🍞", nameEN: "1 Loaf of Bread 🍞" },
        { price: 50, nameTR: "1 Döner Ayran 🌯", nameEN: "1 Kebab & Drink 🌯" },
        { price: 200, nameTR: "Netflix Üyeliği 📺", nameEN: "Netflix Subscription 📺" },
        { price: 1000, nameTR: "Haftalık Market 🛒", nameEN: "Weekly Groceries 🛒" },
        { price: 5000, nameTR: "Kira Yardımı 🏠", nameEN: "Rent Support 🏠" },
        { price: 25000, nameTR: "Oyun Konsolu 🎮", nameEN: "Console 🎮" },
        { price: 60000, nameTR: "iPhone 15 Pro 📱", nameEN: "iPhone 15 Pro 📱" },
        { price: 150000, nameTR: "2. El Araba 🚗", nameEN: "Used Car 🚗" },
        { price: 500000, nameTR: "Çocuğun Okul Masrafı 🎓", nameEN: "Child's Education 🎓" },
        { price: 1000000, nameTR: "Sıfır Araba 🏎️", nameEN: "New Sport Car 🏎️" },
        { price: 3000000, nameTR: "Güzel Bir Ev 🏡", nameEN: "Nice House 🏡" },
        { price: 10000000, nameTR: "Emeklilik Fonu 👴", nameEN: "Retirement Fund 👴" },
        { price: 100000000, nameTR: "Özel Ada 🏝️", nameEN: "Private Island 🏝️" }
    ];

    if (money < realityItems[0].price) return;
    if (el.classList.contains('hidden')) el.classList.remove('hidden');

    let bestItem = null;
    let count = 1;
    for (let i = realityItems.length - 1; i >= 0; i--) {
        if (money >= realityItems[i].price) { bestItem = realityItems[i]; count = Math.floor(money / bestItem.price); break; }
    }
    if (bestItem) {
        labelEl.textContent = t.ui.opportunity;
        const name = currentLang === 'tr' ? bestItem.nameTR : bestItem.nameEN;
        valEl.textContent = `${count} x ${name}`;
    }
}

function addDrawToStream(drawSet, userSet) {
    const container = document.getElementById('drawLogStream');
    if (!container) return;
    const row = document.createElement('div');
    row.className = 'stream-row';
    const sortedDraw = Array.from(drawSet).sort((a, b) => a - b).slice(0, 10);
    sortedDraw.forEach(num => {
        const el = document.createElement('div');
        el.className = 'num-mini';
        if (userSet.has(num)) el.classList.add('hit');
        el.textContent = num;
        row.appendChild(el);
    });
    container.insertBefore(row, container.firstChild);
    if (container.children.length > 10) container.removeChild(container.lastChild);
}

// --------------------------------------------
// 9. INITIALIZATION
// --------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(err => console.error('Service Worker Failed:', err));
    }

    // Initialize Systems
    confettiSystem = new ConfettiCelebration();
    particleSystem = new FloatingParticles();
    loaderSystem = new LoadingOverlay();
    soundSystem = new SoundSystem();

    particleSystem.init();
    document.body.addEventListener('click', () => soundSystem.init(), { once: true });

    // Initialize Instances
    Object.keys(gamesConfig).forEach(key => {
        simulations[key] = new SimulationInstance(key);
    });

    // Bind Events
    document.querySelectorAll('.game-btn').forEach(btn =>
        btn.addEventListener('click', () => changeGame(btn.dataset.game))
    );
    document.getElementById('randomBtn').addEventListener('click', randomFillCurrent);
    document.getElementById('startBtn').addEventListener('click', startCurrentSimulation);
    document.getElementById('stopBtn').addEventListener('click', stopCurrentSimulation);
    document.getElementById('closeModal').addEventListener('click', () => document.getElementById('winnerModal').classList.add('hidden'));

    // Speed Buttons
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = parseInt(btn.dataset.speed);
            speedMultiplier = speed;
            document.getElementById('speedValue').textContent = speed + 'x';

            // Update active state
            document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.addEventListener('click', shareResult);

    // Start App & Restore Language
    changeGame('sayisal');

    // Check localStorage for saved language
    const savedLang = localStorage.getItem('userLang');
    if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
        setLang(savedLang);
    } else {
        setLang('tr');
    }
});
