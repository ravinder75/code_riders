/**
 * ============================================================================
 * VECTOR ODYSSEY: WORLDS OF GRAVITY
 * RESPAWN | PRAVRUTTI 2.0 | CODE RIDERS TEAM 6
 * ============================================================================
 * Direct 2D Space Flight & Planetary Exploration Game.
 * Features:
 * - Direct spaceship launch with new high-tech starfighter sprite.
 * - Real-time tactical sector radar & expanded galaxy map [M].
 * - Full 16-frame animated player character (Goku: Idle, Run, Jump, Attack).
 * - Zero-jitter anchor alignment, physics collision hitbox, Kamehameha attack.
 * - Web Audio procedural sound synthesis.
 */

'use strict';

// ============================================================================
// 1. PROCEDURAL WEB AUDIO SYNTHESIZER
// ============================================================================
class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.thrusterOsc = null;
    this.thrusterGain = null;
    this.isThrusting = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled && this.thrusterGain) {
      this.thrusterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.enabled;
  }

  startThrusterHum() {
    if (!this.enabled || !this.ctx) return;
    if (this.isThrusting) return;
    try {
      this.isThrusting = true;
      this.thrusterOsc = this.ctx.createOscillator();
      this.thrusterGain = this.ctx.createGain();
      this.thrusterOsc.type = 'sawtooth';
      this.thrusterOsc.frequency.setValueAtTime(70, this.ctx.currentTime);
      this.thrusterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.thrusterGain.gain.exponentialRampToValueAtTime(0.09, this.ctx.currentTime + 0.1);
      this.thrusterOsc.connect(this.thrusterGain);
      this.thrusterGain.connect(this.ctx.destination);
      this.thrusterOsc.start();
    } catch (e) {}
  }

  stopThrusterHum() {
    if (!this.isThrusting || !this.ctx) return;
    try {
      this.isThrusting = false;
      if (this.thrusterGain) {
        this.thrusterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
        setTimeout(() => {
          if (this.thrusterOsc) {
            try { this.thrusterOsc.stop(); } catch(e) {}
            this.thrusterOsc = null;
            this.thrusterGain = null;
          }
        }, 160);
      }
    } catch (e) {}
  }

  playBoost() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }

  playImpact() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  playPickup() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playAttackCharge() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }

  playAttackBlast() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch (e) {}
  }

  playJump() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(620, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playLand() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playCrystalCollect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.04 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.04);
        osc.stop(this.ctx.currentTime + i * 0.04 + 0.22);
      });
    } catch (e) {}
  }

  playDestinationArrival() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.14, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.8);
      });
    } catch (e) {}
  }

  playCheckpointReached() {
    if (!this.enabled || !this.ctx) return;
    try {
      const chords = [440, 554.37, 659.25, 880];
      chords.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.2);
      });
    } catch (e) {}
  }

  playHazardRepel() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }
}

// ============================================================================
// 2. VECTOR ODYSSEY GAME CORE
// ============================================================================
class VectorOdysseyGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.audio = new SoundController();

    // Virtual Native Viewport Resolution (16:9)
    this.V_WIDTH = 1600;
    this.V_HEIGHT = 900;

    // States: 'SPACE_FLIGHT', 'LANDING', 'PLAYING', 'PAUSED'
    this.state = 'SPACE_FLIGHT';
    this.previousState = 'SPACE_FLIGHT';

    // Camera in 2D World
    this.cameraX = 0;
    this.cameraY = 0;

    // Space Flight World Dimensions
    this.spaceWorld = {
      width: 4800,
      height: 2000
    };

    // Preloaded Assets
    this.assets = {
      spaceship: null,
      player: {
        idle: [],
        run: [],
        jump: [],
        attack: []
      },
      playerMeta: null
    };
    this.loadAssets();

    // Controllable Spaceship Entity
    this.ship = {
      x: 280,
      y: 1000,
      radius: 26,
      angle: 0, // Radians, 0 = pointing right (+X)
      vx: 0,
      vy: 0,
      speed: 0,
      maxSpeed: 420,
      boostSpeed: 660,
      accel: 540,
      turnRate: 3.2,
      drag: 0.984,
      boostActive: false,
      boostFuel: 100,
      shield: 100,
      maxShield: 100,
      shieldHitCooldown: 0,
      isInvulnerable: 0
    };

    // Celestial Worlds in the Sector (Galaxy Map System)
    this.planets = [
      { id: 1, name: 'CYGNUS PRIME', x: 4100, y: 1000, radius: 260, landingRadius: 360, color: '#00f3ff', unlocked: true },
      { id: 2, name: 'CRIMSON FRONTIER', x: 2400, y: 350, radius: 120, landingRadius: 180, color: '#ef4444', unlocked: false },
      { id: 3, name: 'NEBULA-9', x: 3200, y: 1650, radius: 140, landingRadius: 200, color: '#a855f7', unlocked: false },
      { id: 4, name: 'FROST TITAN', x: 1400, y: 1600, radius: 110, landingRadius: 160, color: '#38bdf8', unlocked: false },
      { id: 5, name: 'ECLIPSE CORE', x: 4400, y: 350, radius: 130, landingRadius: 180, color: '#facc15', unlocked: false }
    ];
    this.cygnusPrime = this.planets[0];

    // Space Obstacles
    this.asteroids = [];
    this.gravityWell = null;
    this.patrolDrone = null;
    this.spaceCanisters = [];

    // Radar / Full Map State
    this.fullMapOpen = false;

    // On-Foot Surface Player Entity (Cygnus Prime)
    this.surfaceLevelWidth = 2600;
    this.player = {
      x: 120,
      y: 590,
      w: 38,
      h: 68, // Consistent AABB collision hitbox
      vx: 0,
      vy: 0,
      speed: 340,
      accel: 2000,
      friction: 0.82,
      gravity: 980,
      jumpImpulse: -560,
      onGround: false,
      jumpCooldown: 0,
      coyoteTimer: 0,
      jumpBufferTimer: 0,
      facing: 1,
      respawnX: 120,
      respawnY: 590,
      isInvulnerable: 0,

      // Animation State Machine
      animState: 'idle', // 'idle', 'run', 'jump', 'attack'
      animFrame: 0,
      animTimer: 0,
      isAttacking: false,
      attackCooldown: 0,
      justLandedTimer: 0
    };

    // Surface Entities
    this.platforms = [];
    this.crystals = [];
    this.obstacles = [];
    this.checkpointBeacon = null;
    this.ancientGate = null;
    this.terminal = null;
    this.crystalsCollected = 0;
    this.totalCrystals = 5;
    this.checkpointReached = false;
    this.terminalOpen = false;

    // Landing sequence variables
    this.landingProgress = 0;
    this.landingDuration = 2.2;
    this.landingTimer = 0;

    // Cosmic background particle systems
    this.starsFar = [];
    this.starsMid = [];
    this.starsNear = [];
    this.particles = [];

    // Inputs
    this.keys = {
      thrust: false,
      brake: false,
      steerLeft: false,
      steerRight: false,
      boost: false,
      jump: false,
      left: false,
      right: false,
      attack: false,
      interact: false
    };

    // Time
    this.lastTime = performance.now();
    this.gameTime = 0;

    // Initialization
    this.initCosmos();
    this.initSpaceEntities();
    this.initSurfaceLevel();
    this.initUI();
    this.bindEvents();

    // Start loop
    requestAnimationFrame((t) => this.loop(t));
  }

  // --------------------------------------------------------------------------
  // ASSET PRELOADER (Spaceship & 16-Frame Goku Sprites)
  // --------------------------------------------------------------------------
  loadAssets() {
    // 1. Spaceship Starfighter Sprite
    const shipImg = new Image();
    shipImg.src = 'assets/spaceship.png';
    shipImg.onload = () => { this.assets.spaceship = shipImg; };

    // 2. Load Animation Metadata & Goku Frames
    fetch('assets/player/animation_meta.json')
      .then(r => r.json())
      .then(meta => {
        this.assets.playerMeta = meta;
        ['idle', 'run', 'jump', 'attack'].forEach(state => {
          this.assets.player[state] = [];
          meta[state].forEach((item, idx) => {
            const frameImg = new Image();
            frameImg.src = `assets/player/${item.file}`;
            this.assets.player[state][idx] = {
              img: frameImg,
              meta: item
            };
          });
        });
      })
      .catch(e => console.error('Error loading player animation metadata:', e));
  }

  // --------------------------------------------------------------------------
  // COSMIC ENVIRONMENT SETUP
  // --------------------------------------------------------------------------
  initCosmos() {
    this.starsFar = [];
    this.starsMid = [];
    this.starsNear = [];

    for (let i = 0; i < 220; i++) {
      this.starsFar.push({
        x: Math.random() * this.spaceWorld.width,
        y: Math.random() * this.spaceWorld.height,
        size: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleRate: Math.random() * 2 + 1
      });
    }

    for (let i = 0; i < 110; i++) {
      this.starsMid.push({
        x: Math.random() * this.spaceWorld.width,
        y: Math.random() * this.spaceWorld.height,
        size: Math.random() * 2.4 + 1.2,
        alpha: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#38bdf8' : '#c084fc'),
        twinkleRate: Math.random() * 3 + 1.5
      });
    }

    for (let i = 0; i < 50; i++) {
      this.starsNear.push({
        x: Math.random() * this.spaceWorld.width,
        y: Math.random() * this.spaceWorld.height,
        size: Math.random() * 3.5 + 1.8,
        alpha: 0.9,
        color: '#00f3ff'
      });
    }
  }

  initSpaceEntities() {
    this.asteroids = [];
    this.spaceCanisters = [];

    const asteroidConfigs = [
      { x: 850, y: 820, radius: 46, rotSpeed: 0.3 },
      { x: 1100, y: 1250, radius: 54, rotSpeed: -0.4 },
      { x: 1350, y: 700, radius: 38, rotSpeed: 0.5 },
      { x: 1550, y: 1100, radius: 52, rotSpeed: -0.25 },
      { x: 1800, y: 850, radius: 44, rotSpeed: 0.35 },
      { x: 2550, y: 760, radius: 48, rotSpeed: -0.3 },
      { x: 2850, y: 1220, radius: 56, rotSpeed: 0.4 },
      { x: 3150, y: 880, radius: 42, rotSpeed: -0.45 },
      { x: 3450, y: 1140, radius: 50, rotSpeed: 0.3 }
    ];

    asteroidConfigs.forEach(cfg => {
      const numPts = 8;
      const pts = [];
      for (let i = 0; i < numPts; i++) {
        const a = (i * 2 * Math.PI) / numPts;
        const r = cfg.radius * (0.8 + Math.random() * 0.4);
        pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
      }

      this.asteroids.push({
        x: cfg.x,
        y: cfg.y,
        radius: cfg.radius,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: cfg.rotSpeed,
        pts: pts
      });
    });

    this.gravityWell = {
      x: 2150,
      y: 1000,
      radius: 64,
      gravityRadius: 280,
      rot: 0,
      rotSpeed: 0.2,
      strength: 180000
    };

    this.patrolDrone = {
      x: 2900,
      baseY: 980,
      y: 980,
      amplitude: 340,
      speed: 1.4,
      radius: 28
    };

    this.spaceCanisters = [
      { x: 950, y: 1000, radius: 14, collected: false },
      { x: 1450, y: 920, radius: 14, collected: false },
      { x: 2350, y: 1150, radius: 14, collected: false },
      { x: 3300, y: 980, radius: 14, collected: false }
    ];
  }

  initSurfaceLevel() {
    this.surfaceLevelWidth = 2600;
    this.checkpointReached = false;
    this.crystalsCollected = 0;
    this.terminalOpen = false;

    this.player.x = 120;
    this.player.y = 590;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.facing = 1;
    this.player.respawnX = 120;
    this.player.respawnY = 590;
    this.player.animState = 'idle';
    this.player.animFrame = 0;
    this.player.isAttacking = false;
    this.player.jumpCooldown = 0;
    this.player.coyoteTimer = 0;
    this.player.jumpBufferTimer = 0;
    this.player.justLandedTimer = 0;
    this.player.onGround = false;

    this.platforms = [
      { x: 0, y: 660, w: 560, h: 240, type: 'ground' },
      { x: 340, y: 550, w: 160, h: 28, type: 'platform' },
      { x: 620, y: 580, w: 90, h: 24, type: 'energy_platform' },
      { x: 760, y: 660, w: 420, h: 240, type: 'ground' },
      { x: 880, y: 520, w: 140, h: 24, type: 'platform' },
      { x: 1060, y: 440, w: 130, h: 24, type: 'platform' },
      { x: 1220, y: 660, w: 220, h: 240, type: 'ground' },
      { x: 1460, y: 660, w: 260, h: 240, type: 'slope', slopeAngle: 30, rise: 80 },
      { x: 1720, y: 580, w: 340, h: 320, type: 'ground' },
      { x: 2080, y: 540, w: 120, h: 24, type: 'energy_platform' },
      { x: 2220, y: 660, w: 380, h: 240, type: 'ground' }
    ];

    this.crystals = [
      { id: 1, x: 420, y: 500, w: 22, h: 32, collected: false, phase: 0 },
      { id: 2, x: 665, y: 530, w: 22, h: 32, collected: false, phase: 1.2 },
      { id: 3, x: 1125, y: 390, w: 22, h: 32, collected: false, phase: 2.4 },
      { id: 4, x: 1560, y: 560, w: 22, h: 32, collected: false, phase: 3.6 },
      { id: 5, x: 2140, y: 480, w: 22, h: 32, collected: false, phase: 4.8 }
    ];

    this.obstacles = [
      {
        x: 1350,
        y: 520,
        w: 36,
        h: 140,
        cycleTime: 3.0,
        activeDuration: 1.4,
        timer: 0,
        isActive: false
      }
    ];

    this.terminal = {
      x: 1480,
      y: 600,
      w: 40,
      h: 60,
      interacted: false
    };

    this.checkpointBeacon = {
      x: 1820,
      y: 580,
      w: 30,
      h: 70,
      activated: false
    };

    this.ancientGate = {
      x: 2360,
      y: 490,
      w: 120,
      h: 170,
      activated: false,
      rotation: 0
    };
  }

  initUI() {
    this.screens = {
      spaceHud: document.getElementById('space-hud'),
      landing: document.getElementById('landing-screen'),
      surfaceHud: document.getElementById('game-hud'),
      pauseModal: document.getElementById('pause-modal'),
      controlsModal: document.getElementById('controls-modal'),
      fullMapModal: document.getElementById('full-map-modal'),
      checkpointBanner: document.getElementById('checkpoint-banner'),
      mathTerminal: document.getElementById('math-terminal')
    };

    this.transitionToState('SPACE_FLIGHT');

    setTimeout(() => {
      const banner = document.getElementById('flight-banner');
      if (banner) banner.style.opacity = '0';
    }, 4500);
  }

  bindEvents() {
    // Quick Actions
    document.getElementById('btn-audio-toggle')?.addEventListener('click', () => {
      this.audio.init();
      const enabled = this.audio.toggle();
      const icon = document.getElementById('audio-icon');
      if (icon) icon.textContent = enabled ? '🔊 SOUND' : '🔇 OFF';
    });

    // Sector Map Toggle
    document.getElementById('btn-toggle-map')?.addEventListener('click', () => {
      this.toggleFullMap();
    });
    document.getElementById('hud-minimap-container')?.addEventListener('click', () => {
      this.toggleFullMap();
    });
    document.getElementById('btn-close-full-map')?.addEventListener('click', () => {
      this.toggleFullMap(false);
    });
    document.getElementById('btn-resume-from-map')?.addEventListener('click', () => {
      this.toggleFullMap(false);
    });

    document.getElementById('btn-flight-pause')?.addEventListener('click', () => {
      this.togglePause();
    });

    document.getElementById('btn-pause')?.addEventListener('click', () => {
      this.togglePause();
    });

    document.getElementById('btn-pause-resume')?.addEventListener('click', () => {
      this.togglePause();
    });

    document.getElementById('btn-pause-restart')?.addEventListener('click', () => {
      this.togglePause();
      this.restartFlight();
    });

    document.getElementById('btn-pause-controls')?.addEventListener('click', () => {
      this.screens.controlsModal.classList.add('active');
    });

    document.getElementById('btn-controls-close')?.addEventListener('click', () => {
      this.screens.controlsModal.classList.remove('active');
    });

    document.getElementById('btn-skip-landing')?.addEventListener('click', () => {
      this.skipLanding();
    });

    document.getElementById('btn-checkpoint-fly')?.addEventListener('click', () => {
      this.screens.checkpointBanner.classList.remove('active');
      this.restartFlight();
    });

    document.getElementById('btn-checkpoint-replay')?.addEventListener('click', () => {
      this.screens.checkpointBanner.classList.remove('active');
      this.initSurfaceLevel();
      this.transitionToState('PLAYING');
    });

    document.getElementById('btn-close-terminal')?.addEventListener('click', () => {
      this.closeTerminal();
    });

    document.getElementById('btn-terminal-dismiss')?.addEventListener('click', () => {
      this.closeTerminal();
    });

    // Attack Action Button (On-Foot)
    document.getElementById('btn-attack-action')?.addEventListener('click', () => {
      this.triggerAttack();
    });

    // Jump Action Button (On-Foot)
    document.getElementById('btn-jump-action')?.addEventListener('click', () => {
      if (this.state === 'PLAYING') {
        this.triggerJump();
      }
    });

    // Quick Land Button (From Space directly to Planet Surface)
    document.getElementById('btn-quick-land')?.addEventListener('click', () => {
      this.startLandingSequence();
      this.skipLanding();
    });

    // Return to Orbit Button
    document.getElementById('btn-surface-orbit')?.addEventListener('click', () => {
      this.restartFlight();
    });

    // Canvas click triggers attack on foot
    this.canvas.addEventListener('mousedown', () => {
      if (this.state === 'PLAYING') {
        this.triggerAttack();
      }
    });

    // Keyboard Inputs
    window.addEventListener('keydown', (e) => {
      this.audio.init();

      // Prevent page scrolling on navigation/action keys
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        this.keys.thrust = true;
        this.keys.jump = true;
        if (this.state === 'SPACE_FLIGHT') {
          this.audio.startThrusterHum();
        } else if (this.state === 'PLAYING') {
          this.player.jumpBufferTimer = 0.15;
          this.triggerJump();
        }
      }
      if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        this.keys.brake = true;
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        this.keys.steerLeft = true;
        this.keys.left = true;
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        this.keys.steerRight = true;
        this.keys.right = true;
      }
      if (e.code === 'Space') {
        this.keys.boost = true;
        this.keys.jump = true;
        if (this.state === 'SPACE_FLIGHT' && this.ship.boostFuel > 15) {
          this.ship.boostActive = true;
          this.audio.playBoost();
        } else if (this.state === 'LANDING') {
          this.skipLanding();
        } else if (this.state === 'PLAYING') {
          this.player.jumpBufferTimer = 0.15;
          this.triggerJump();
        }
      }
      if (e.code === 'KeyJ' || e.code === 'KeyZ' || e.code === 'KeyF') {
        if (this.state === 'PLAYING') {
          this.triggerAttack();
        }
      }
      if (e.code === 'KeyM') {
        if (this.state === 'SPACE_FLIGHT' || this.fullMapOpen) {
          this.toggleFullMap();
        }
      }
      if (e.code === 'KeyE') {
        this.tryInteract();
      }
      if (e.code === 'Escape' || e.code === 'KeyP') {
        if (this.fullMapOpen) {
          this.toggleFullMap(false);
        } else {
          this.togglePause();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        this.keys.thrust = false;
        this.keys.jump = false;
        if (this.state === 'SPACE_FLIGHT') {
          this.audio.stopThrusterHum();
        } else if (this.state === 'PLAYING' && this.player.vy < -150) {
          this.player.vy *= 0.5;
        }
      }
      if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        this.keys.brake = false;
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        this.keys.steerLeft = false;
        this.keys.left = false;
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        this.keys.steerRight = false;
        this.keys.right = false;
      }
      if (e.code === 'Space') {
        this.keys.boost = false;
        this.keys.jump = false;
        this.ship.boostActive = false;
        if (this.state === 'PLAYING' && this.player.vy < -150) {
          this.player.vy *= 0.5;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  transitionToState(newState) {
    Object.values(this.screens).forEach(s => {
      if (s) s.classList.remove('active');
    });

    this.previousState = this.state;
    this.state = newState;

    switch (newState) {
      case 'SPACE_FLIGHT':
        this.screens.spaceHud?.classList.add('active');
        break;
      case 'LANDING':
        this.screens.landing?.classList.add('active');
        this.audio.stopThrusterHum();
        break;
      case 'PLAYING':
        this.screens.surfaceHud?.classList.add('active');
        this.audio.stopThrusterHum();
        this.updateHUD();
        break;
      case 'PAUSED':
        if (this.previousState === 'SPACE_FLIGHT') {
          this.screens.spaceHud?.classList.add('active');
        } else {
          this.screens.surfaceHud?.classList.add('active');
        }
        this.screens.pauseModal?.classList.add('active');
        this.audio.stopThrusterHum();
        break;
    }
  }

  togglePause() {
    if (this.state === 'PAUSED') {
      this.transitionToState(this.previousState);
    } else {
      this.transitionToState('PAUSED');
    }
  }

  toggleFullMap(forceState) {
    this.fullMapOpen = forceState !== undefined ? forceState : !this.fullMapOpen;
    if (this.fullMapOpen) {
      this.screens.fullMapModal?.classList.add('active');
      this.drawFullSectorMap();
    } else {
      this.screens.fullMapModal?.classList.remove('active');
    }
  }

  restartFlight() {
    this.ship.x = 280;
    this.ship.y = 1000;
    this.ship.vx = 0;
    this.ship.vy = 0;
    this.ship.angle = 0;
    this.ship.shield = 100;
    this.initSpaceEntities();
    this.transitionToState('SPACE_FLIGHT');
  }

  // --------------------------------------------------------------------------
  // SPACESHIP FLIGHT PHYSICS & CONTROLS
  // --------------------------------------------------------------------------
  updateSpaceship(dt) {
    const s = this.ship;

    // Steering
    if (this.keys.steerLeft) s.angle -= s.turnRate * dt;
    if (this.keys.steerRight) s.angle += s.turnRate * dt;

    // Vector Thrust Acceleration
    if (this.keys.thrust) {
      const accel = s.boostActive ? s.accel * 1.8 : s.accel;
      s.vx += Math.cos(s.angle) * accel * dt;
      s.vy += Math.sin(s.angle) * accel * dt;

      // Dual Plasma Exhaust Trails
      const rearDist = 28;
      const wingSpread = 12;
      const p1x = s.x - Math.cos(s.angle) * rearDist + Math.sin(s.angle) * wingSpread;
      const p1y = s.y - Math.sin(s.angle) * rearDist - Math.cos(s.angle) * wingSpread;
      const p2x = s.x - Math.cos(s.angle) * rearDist - Math.sin(s.angle) * wingSpread;
      const p2y = s.y - Math.sin(s.angle) * rearDist + Math.cos(s.angle) * wingSpread;

      const pColor = s.boostActive ? '#facc15' : '#00f3ff';
      [ {x: p1x, y: p1y}, {x: p2x, y: p2y} ].forEach(pos => {
        this.particles.push({
          x: pos.x,
          y: pos.y,
          vx: -Math.cos(s.angle) * (s.boostActive ? 220 : 120) + (Math.random() - 0.5) * 40,
          vy: -Math.sin(s.angle) * (s.boostActive ? 220 : 120) + (Math.random() - 0.5) * 40,
          life: s.boostActive ? 0.35 : 0.22,
          maxLife: s.boostActive ? 0.35 : 0.22,
          color: pColor,
          size: Math.random() * 4 + 2
        });
      });
    }

    // Active Braking / Vacuum Drag
    if (this.keys.brake) {
      s.vx *= 0.94;
      s.vy *= 0.94;
    } else {
      s.vx *= s.drag;
      s.vy *= s.drag;
    }

    // Boost Fuel
    if (s.boostActive) {
      s.boostFuel = Math.max(0, s.boostFuel - 45 * dt);
      if (s.boostFuel <= 0) s.boostActive = false;
    } else {
      s.boostFuel = Math.min(100, s.boostFuel + 20 * dt);
    }

    // Gravitational Anomaly Field (Mathematical Trajectory Bending)
    if (this.gravityWell) {
      const gw = this.gravityWell;
      const dx = gw.x - s.x;
      const dy = gw.y - s.y;
      const dist = Math.hypot(dx, dy);

      if (dist < gw.gravityRadius && dist > gw.radius) {
        const force = gw.strength / (dist * dist);
        s.vx += (dx / dist) * force * dt;
        s.vy += (dy / dist) * force * dt;

        const warning = document.getElementById('hud-warning-alert');
        if (warning) {
          warning.classList.add('active');
          const warnText = document.getElementById('warning-text');
          if (warnText) warnText.textContent = `GRAVITY FIELD BENDING TRAJECTORY (d: ${Math.floor(dist)}m)`;
        }
      } else {
        const warning = document.getElementById('hud-warning-alert');
        if (warning && !s.shieldHitCooldown) warning.classList.remove('active');
      }
    }

    // Velocity Clamping
    const maxSpd = s.boostActive ? s.boostSpeed : s.maxSpeed;
    s.speed = Math.hypot(s.vx, s.vy);
    if (s.speed > maxSpd) {
      s.vx = (s.vx / s.speed) * maxSpd;
      s.vy = (s.vy / s.speed) * maxSpd;
      s.speed = maxSpd;
    }

    // Position Integration
    s.x += s.vx * dt;
    s.y += s.vy * dt;

    // Boundaries
    s.x = Math.max(s.radius, Math.min(s.x, this.spaceWorld.width - s.radius));
    s.y = Math.max(s.radius, Math.min(s.y, this.spaceWorld.height - s.radius));

    if (s.isInvulnerable > 0) s.isInvulnerable -= dt;
    if (s.shieldHitCooldown > 0) s.shieldHitCooldown -= dt;

    // Camera follow
    const targetCamX = s.x - this.V_WIDTH / 2;
    const targetCamY = s.y - this.V_HEIGHT / 2;
    this.cameraX += (targetCamX - this.cameraX) * 0.12;
    this.cameraY += (targetCamY - this.cameraY) * 0.12;

    this.cameraX = Math.max(0, Math.min(this.cameraX, this.spaceWorld.width - this.V_WIDTH));
    this.cameraY = Math.max(0, Math.min(this.cameraY, this.spaceWorld.height - this.V_HEIGHT));

    // Update Telemetry & Minimap
    this.updateFlightHUD();
    this.drawSectorMinimap();

    // Check Cygnus Prime Arrival
    this.checkPlanetApproach();
  }

  updateSpaceWorld(dt) {
    this.gameTime += dt;

    // Asteroids
    this.asteroids.forEach(ast => {
      ast.rot += ast.rotSpeed * dt;
      const dist = Math.hypot(ast.x - this.ship.x, ast.y - this.ship.y);
      if (dist < ast.radius + this.ship.radius) {
        this.handleShipObstacleCollision(ast.x, ast.y, 20);
      }
    });

    // Gravity Well Asteroid
    if (this.gravityWell) {
      this.gravityWell.rot += this.gravityWell.rotSpeed * dt;
      const gDist = Math.hypot(this.gravityWell.x - this.ship.x, this.gravityWell.y - this.ship.y);
      if (gDist < this.gravityWell.radius + this.ship.radius) {
        this.handleShipObstacleCollision(this.gravityWell.x, this.gravityWell.y, 30);
      }
    }

    // Moving Hazard Drone
    if (this.patrolDrone) {
      const drone = this.patrolDrone;
      drone.y = drone.baseY + Math.sin(this.gameTime * drone.speed) * drone.amplitude;
      const dDist = Math.hypot(drone.x - this.ship.x, drone.y - this.ship.y);
      if (dDist < drone.radius + this.ship.radius) {
        this.handleShipObstacleCollision(drone.x, drone.y, 25);
      }
    }

    // Stardust Canisters
    this.spaceCanisters.forEach(c => {
      if (c.collected) return;
      const dist = Math.hypot(c.x - this.ship.x, c.y - this.ship.y);
      if (dist < c.radius + this.ship.radius) {
        c.collected = true;
        this.ship.shield = Math.min(this.ship.maxShield, this.ship.shield + 25);
        this.audio.playPickup();

        for (let i = 0; i < 18; i++) {
          this.particles.push({
            x: c.x,
            y: c.y,
            vx: (Math.random() - 0.5) * 160,
            vy: (Math.random() - 0.5) * 160,
            life: 0.45,
            maxLife: 0.45,
            color: '#00f3ff',
            size: Math.random() * 3 + 2
          });
        }
      }
    });

    // Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  handleShipObstacleCollision(obsX, obsY, damage) {
    const s = this.ship;
    if (s.isInvulnerable > 0) return;

    this.audio.playImpact();
    s.shield = Math.max(0, s.shield - damage);
    s.isInvulnerable = 0.8;
    s.shieldHitCooldown = 1.2;

    const angleToShip = Math.atan2(s.y - obsY, s.x - obsX);
    s.vx = Math.cos(angleToShip) * 320;
    s.vy = Math.sin(angleToShip) * 320;

    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: s.x,
        y: s.y,
        vx: (Math.random() - 0.5) * 260,
        vy: (Math.random() - 0.5) * 260,
        life: 0.5,
        maxLife: 0.5,
        color: '#ef4444',
        size: Math.random() * 4 + 2
      });
    }

    if (s.shield <= 0) {
      s.shield = 40;
      s.x = Math.max(280, s.x - 300);
      s.vx = 0;
      s.vy = 0;
    }
  }

  checkPlanetApproach() {
    const s = this.ship;
    const dest = this.cygnusPrime;
    const dist = Math.hypot(dest.x - s.x, dest.y - s.y);

    if (dist <= dest.landingRadius) {
      this.audio.playDestinationArrival();
      this.startLandingSequence();
    }
  }

  updateFlightHUD() {
    const s = this.ship;
    const dest = this.cygnusPrime;

    const shieldBar = document.getElementById('hud-shield-bar');
    const shieldText = document.getElementById('hud-shield-text');
    if (shieldBar && shieldText) {
      const pct = Math.max(0, Math.floor((s.shield / s.maxShield) * 100));
      shieldBar.style.width = `${pct}%`;
      shieldText.textContent = `${pct}%`;
      shieldBar.classList.toggle('low', pct <= 30);
    }

    const dx = dest.x - s.x;
    const dy = dest.y - s.y;
    const realDist = Math.max(0, Math.hypot(dx, dy) - dest.landingRadius);
    const navAngle = Math.atan2(dy, dx);

    const arrow = document.getElementById('hud-nav-arrow');
    const distReadout = document.getElementById('hud-distance-readout');
    if (arrow) {
      const deg = (navAngle * 180) / Math.PI + 90;
      arrow.style.transform = `rotate(${deg}deg)`;
    }
    if (distReadout) {
      distReadout.textContent = `${Math.floor(realDist).toLocaleString()} m`;
    }

    const speedText = document.getElementById('hud-speed-text');
    const speedBar = document.getElementById('hud-speed-bar');
    const vecReadout = document.getElementById('hud-flight-vector');
    if (speedText && speedBar) {
      const spdKmh = Math.floor(s.speed * 2.2);
      speedText.textContent = `${spdKmh} km/s`;
      const spdPct = Math.min(100, Math.floor((s.speed / s.boostSpeed) * 100));
      speedBar.style.width = `${spdPct}%`;
    }
    if (vecReadout) {
      vecReadout.textContent = `V-VEC: (${s.vx.toFixed(1)}, ${s.vy.toFixed(1)})`;
    }
  }

  // --------------------------------------------------------------------------
  // TACTICAL SECTOR RADAR & EXPANDED GALAXY MAP (Req 1)
  // --------------------------------------------------------------------------
  drawSectorMinimap() {
    const mini = document.getElementById('minimapCanvas');
    if (!mini) return;
    const mctx = mini.getContext('2d');
    const mw = mini.width;
    const mh = mini.height;

    mctx.clearRect(0, 0, mw, mh);

    // Scale factors: spaceWorld (4800 x 2000) -> minimap (mw x mh)
    const sx = mw / this.spaceWorld.width;
    const sy = mh / this.spaceWorld.height;

    // Background Grid
    mctx.fillStyle = 'rgba(2, 6, 18, 0.95)';
    mctx.fillRect(0, 0, mw, mh);

    mctx.strokeStyle = 'rgba(0, 243, 255, 0.12)';
    mctx.lineWidth = 1;
    for (let x = 0; x < mw; x += 36) {
      mctx.beginPath(); mctx.moveTo(x, 0); mctx.lineTo(x, mh); mctx.stroke();
    }
    for (let y = 0; y < mh; y += 32) {
      mctx.beginPath(); mctx.moveTo(0, y); mctx.lineTo(mw, y); mctx.stroke();
    }

    // Rotating Radar Sweep Line
    const sweepAngle = (this.gameTime * 2.5) % (Math.PI * 2);
    mctx.save();
    mctx.translate(this.ship.x * sx, this.ship.y * sy);
    mctx.strokeStyle = 'rgba(0, 243, 255, 0.25)';
    mctx.beginPath();
    mctx.moveTo(0, 0);
    mctx.lineTo(Math.cos(sweepAngle) * 70, Math.sin(sweepAngle) * 70);
    mctx.stroke();
    mctx.restore();

    // Draw Asteroids on Radar
    mctx.fillStyle = 'rgba(250, 204, 21, 0.6)';
    this.asteroids.forEach(a => {
      mctx.beginPath();
      mctx.arc(a.x * sx, a.y * sy, Math.max(1.5, a.radius * sx * 0.8), 0, Math.PI * 2);
      mctx.fill();
    });

    // Gravity Anomaly
    if (this.gravityWell) {
      mctx.strokeStyle = '#a855f7';
      mctx.lineWidth = 1;
      mctx.beginPath();
      mctx.arc(this.gravityWell.x * sx, this.gravityWell.y * sy, this.gravityWell.gravityRadius * sx, 0, Math.PI * 2);
      mctx.stroke();
    }

    // Draw Other Planetary Worlds on Radar
    this.planets.forEach(p => {
      mctx.fillStyle = p.color;
      mctx.beginPath();
      mctx.arc(p.x * sx, p.y * sy, p.radius * sx, 0, Math.PI * 2);
      mctx.fill();

      // Outer Ring
      mctx.strokeStyle = p.color;
      mctx.beginPath();
      mctx.arc(p.x * sx, p.y * sy, p.landingRadius * sx, 0, Math.PI * 2);
      mctx.stroke();
    });

    // Direction Vector Line to Cygnus Prime
    mctx.strokeStyle = 'rgba(0, 243, 255, 0.4)';
    mctx.setLineDash([3, 3]);
    mctx.beginPath();
    mctx.moveTo(this.ship.x * sx, this.ship.y * sy);
    mctx.lineTo(this.cygnusPrime.x * sx, this.cygnusPrime.y * sy);
    mctx.stroke();
    mctx.setLineDash([]);

    // Player Ship Chevron on Radar
    mctx.save();
    mctx.translate(this.ship.x * sx, this.ship.y * sy);
    mctx.rotate(this.ship.angle);
    mctx.fillStyle = '#ffffff';
    mctx.strokeStyle = '#00f3ff';
    mctx.lineWidth = 1.5;
    mctx.beginPath();
    mctx.moveTo(7, 0);
    mctx.lineTo(-5, 4);
    mctx.lineTo(-2, 0);
    mctx.lineTo(-5, -4);
    mctx.closePath();
    mctx.fill();
    mctx.stroke();
    mctx.restore();
  }

  drawFullSectorMap() {
    const full = document.getElementById('fullMapCanvas');
    if (!full) return;
    const fctx = full.getContext('2d');
    const fw = full.width;
    const fh = full.height;

    fctx.clearRect(0, 0, fw, fh);

    const sx = fw / this.spaceWorld.width;
    const sy = fh / this.spaceWorld.height;

    // Deep Cosmic Background
    fctx.fillStyle = '#03081a';
    fctx.fillRect(0, 0, fw, fh);

    // Range Radar Circles
    fctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
    fctx.lineWidth = 1;
    [1000, 2000, 3000].forEach(r => {
      fctx.beginPath();
      fctx.arc(this.ship.x * sx, this.ship.y * sy, r * sx, 0, Math.PI * 2);
      fctx.stroke();
    });

    // Draw Asteroids
    fctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    this.asteroids.forEach(a => {
      fctx.beginPath();
      fctx.arc(a.x * sx, a.y * sy, a.radius * sx, 0, Math.PI * 2);
      fctx.fill();
    });

    // Draw All 5 Planets in Galaxy
    this.planets.forEach(p => {
      fctx.fillStyle = p.color;
      fctx.beginPath();
      fctx.arc(p.x * sx, p.y * sy, p.radius * sx, 0, Math.PI * 2);
      fctx.fill();

      // Atmospheric halo
      fctx.strokeStyle = p.color;
      fctx.lineWidth = 1.5;
      fctx.beginPath();
      fctx.arc(p.x * sx, p.y * sy, p.landingRadius * sx, 0, Math.PI * 2);
      fctx.stroke();

      // Labels
      fctx.font = 'bold 11px Orbitron';
      fctx.fillStyle = p.unlocked ? '#00f3ff' : '#94a3b8';
      fctx.textAlign = 'center';
      fctx.fillText(p.name + (p.unlocked ? '' : ' [LOCKED]'), p.x * sx, p.y * sy + p.landingRadius * sx + 14);
    });

    // Trajectory Guide Line
    fctx.strokeStyle = '#00f3ff';
    fctx.setLineDash([5, 5]);
    fctx.beginPath();
    fctx.moveTo(this.ship.x * sx, this.ship.y * sy);
    fctx.lineTo(this.cygnusPrime.x * sx, this.cygnusPrime.y * sy);
    fctx.stroke();
    fctx.setLineDash([]);

    // Player Marker
    fctx.save();
    fctx.translate(this.ship.x * sx, this.ship.y * sy);
    fctx.rotate(this.ship.angle);
    fctx.fillStyle = '#00f3ff';
    fctx.beginPath();
    fctx.moveTo(12, 0);
    fctx.lineTo(-8, 7);
    fctx.lineTo(-4, 0);
    fctx.lineTo(-8, -7);
    fctx.closePath();
    fctx.fill();
    fctx.restore();
  }

  // --------------------------------------------------------------------------
  // LANDING SEQUENCE TO CYGNUS PRIME SURFACE
  // --------------------------------------------------------------------------
  startLandingSequence() {
    this.landingProgress = 0;
    this.landingTimer = 0;
    this.transitionToState('LANDING');
    this.initSurfaceLevel();
  }

  skipLanding() {
    if (this.state === 'LANDING') {
      this.landingProgress = 1.0;
      this.transitionToState('PLAYING');
    }
  }

  updateLandingSequence(dt) {
    this.landingTimer += dt;
    this.landingProgress = Math.min(1.0, this.landingTimer / this.landingDuration);

    const gaugeBar = document.getElementById('landing-gauge-bar');
    const readout = document.getElementById('landing-readout');

    if (gaugeBar) gaugeBar.style.width = `${Math.floor(this.landingProgress * 100)}%`;
    if (readout) {
      const alt = Math.floor((1 - this.landingProgress) * 10000);
      readout.textContent = `ATMOSPHERIC ENTRY: ALTITUDE ${alt.toLocaleString()}m • THRUSTERS ACTIVE`;
    }

    if (this.landingProgress >= 1.0) {
      this.transitionToState('PLAYING');
    }
  }

  // --------------------------------------------------------------------------
  // ANIMATED ON-FOOT EXPLORER PHYSICS & COMBAT (Req 2)
  // --------------------------------------------------------------------------
  triggerJump() {
    const cooldown = typeof this.player.jumpCooldown === 'number' ? this.player.jumpCooldown : 0;
    const canJump = (this.player.onGround || (this.player.coyoteTimer && this.player.coyoteTimer > 0)) &&
                    cooldown <= 0 &&
                    !this.player.isAttacking;

    if (canJump) {
      this.player.vy = this.player.jumpImpulse;
      this.player.onGround = false;
      this.player.coyoteTimer = 0;
      this.player.jumpBufferTimer = 0;
      this.player.jumpCooldown = 0.15;
      this.player.justLandedTimer = 0;
      this.audio.playJump();

      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x: this.player.x + this.player.w / 2,
          y: this.player.y + this.player.h,
          vx: (Math.random() - 0.5) * 120,
          vy: Math.random() * 60 + 20,
          life: 0.35,
          maxLife: 0.35,
          color: '#00f3ff',
          size: Math.random() * 3 + 2
        });
      }
    }
  }

  triggerAttack() {
    if (this.player.isAttacking) return;
    this.player.isAttacking = true;
    this.player.animState = 'attack';
    this.player.animFrame = 0;
    this.player.animTimer = 0;
    this.audio.playAttackCharge();

    // Beam spawn / particle charge
    setTimeout(() => {
      this.audio.playAttackBlast();

      // Energy blast particles shooting forward in facing direction
      const blastX = this.player.x + (this.player.facing > 0 ? this.player.w + 40 : -40);
      const blastY = this.player.y + 36;
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: blastX,
          y: blastY + (Math.random() - 0.5) * 20,
          vx: this.player.facing * (Math.random() * 450 + 250),
          vy: (Math.random() - 0.5) * 60,
          life: 0.5,
          maxLife: 0.5,
          color: '#00f3ff',
          size: Math.random() * 5 + 2
        });
      }
    }, 240);
  }

  tryInteract() {
    if (this.state !== 'PLAYING') return;
    if (this.terminal) {
      const dist = Math.abs((this.player.x + this.player.w / 2) - (this.terminal.x + this.terminal.w / 2));
      if (dist < 80) this.openTerminal();
    }
  }

  openTerminal() {
    this.terminalOpen = true;
    this.audio.playPickup();
    this.screens.mathTerminal.classList.add('active');
    this.drawMathDiagram();
  }

  closeTerminal() {
    this.terminalOpen = false;
    this.audio.playPickup();
    this.screens.mathTerminal.classList.remove('active');
  }

  drawMathDiagram() {
    const mathCanvas = document.getElementById('mathCanvas');
    if (!mathCanvas) return;
    const mctx = mathCanvas.getContext('2d');
    const w = mathCanvas.width;
    const h = mathCanvas.height;
    mctx.clearRect(0, 0, w, h);

    mctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
    mctx.lineWidth = 1;
    for (let x = 0; x < w; x += 20) {
      mctx.beginPath(); mctx.moveTo(x, 0); mctx.lineTo(x, h); mctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
      mctx.beginPath(); mctx.moveTo(0, y); mctx.lineTo(w, y); mctx.stroke();
    }

    const startX = 60, startY = 180;
    const endX = 320, endY = 80;

    mctx.strokeStyle = '#00f3ff';
    mctx.lineWidth = 3;
    mctx.beginPath();
    mctx.moveTo(startX, startY);
    mctx.lineTo(endX, endY);
    mctx.lineTo(endX, startY);
    mctx.closePath();
    mctx.fillStyle = 'rgba(0, 243, 255, 0.12)';
    mctx.fill();
    mctx.stroke();

    mctx.beginPath();
    mctx.arc(startX, startY, 45, 0, -Math.atan2(startY - endY, endX - startX), true);
    mctx.strokeStyle = '#facc15';
    mctx.lineWidth = 2;
    mctx.stroke();

    mctx.fillStyle = '#facc15';
    mctx.font = '14px Orbitron';
    mctx.fillText('θ = 30°', startX + 55, startY - 12);

    const blockX = 180, blockY = 134;
    mctx.save();
    mctx.translate(blockX, blockY);
    const angle = -Math.atan2(startY - endY, endX - startX);
    mctx.rotate(angle);
    mctx.fillStyle = '#38bdf8';
    mctx.fillRect(-15, -20, 30, 20);
    mctx.strokeStyle = '#ffffff';
    mctx.lineWidth = 1.5;
    mctx.strokeRect(-15, -20, 30, 20);
    mctx.restore();

    mctx.strokeStyle = '#ef4444';
    mctx.lineWidth = 2.5;
    mctx.beginPath();
    mctx.moveTo(blockX, blockY - 10);
    mctx.lineTo(blockX, blockY + 50);
    mctx.stroke();
    mctx.font = '12px Share Tech Mono';
    mctx.fillStyle = '#ef4444';
    mctx.fillText('g = 9.8 m/s²', blockX + 8, blockY + 40);
  }

  updateSurfacePlayer(dt) {
    const p = this.player;
    if (typeof p.jumpCooldown !== 'number') p.jumpCooldown = 0;
    if (p.jumpCooldown > 0) p.jumpCooldown -= dt;
    if (p.isInvulnerable > 0) p.isInvulnerable -= dt;
    if (p.justLandedTimer > 0) p.justLandedTimer -= dt;
    if (p.coyoteTimer > 0) p.coyoteTimer -= dt;
    if (p.jumpBufferTimer > 0) p.jumpBufferTimer -= dt;

    // Buffered jump check
    if (p.jumpBufferTimer > 0 && p.onGround && p.jumpCooldown <= 0 && !p.isAttacking) {
      this.triggerJump();
    }

    // Horizontal Movement
    let moveInput = 0;
    if (!p.isAttacking) {
      if (this.keys.left) moveInput -= 1;
      if (this.keys.right) moveInput += 1;
    }

    if (moveInput !== 0) {
      p.vx += moveInput * p.accel * dt;
      p.facing = moveInput;

      if (p.onGround && Math.random() < 0.25) {
        this.particles.push({
          x: p.x + (moveInput > 0 ? 0 : p.w),
          y: p.y + p.h,
          vx: -moveInput * (Math.random() * 40 + 20),
          vy: -Math.random() * 20,
          life: 0.25,
          maxLife: 0.25,
          color: 'rgba(0, 243, 255, 0.4)',
          size: Math.random() * 2.5 + 1.5
        });
      }
    } else {
      p.vx *= p.friction;
      if (Math.abs(p.vx) < 5) p.vx = 0;
    }

    if (Math.abs(p.vx) > p.speed) {
      p.vx = Math.sign(p.vx) * p.speed;
    }

    // Gravity
    p.vy += p.gravity * dt;
    if (p.vy > 900) p.vy = 900;

    // Movement & Collisions
    p.x += p.vx * dt;
    this.resolveSurfaceHorizontalCollisions();

    const wasOnGround = p.onGround;
    p.y += p.vy * dt;
    p.onGround = false;
    this.resolveSurfaceVerticalCollisions();

    // Coyote time when running off an edge without jumping
    if (wasOnGround && !p.onGround && p.vy >= 0 && p.jumpCooldown <= 0) {
      p.coyoteTimer = 0.12;
    }

    if (!wasOnGround && p.onGround && p.vy >= 0) {
      this.audio.playLand();
      p.justLandedTimer = 0.14; // Landing crouch pose window
      p.coyoteTimer = 0;
      if (p.jumpBufferTimer > 0 && !p.isAttacking) {
        this.triggerJump();
      }
    }

    // Boundaries
    if (p.x < 0) { p.x = 0; p.vx = 0; }
    if (p.x + p.w > this.surfaceLevelWidth) { p.x = this.surfaceLevelWidth - p.w; p.vx = 0; }

    // Fall recovery
    if (p.y > 880) this.recoverSurfacePlayer();

    // Camera follow
    const targetCamX = p.x - this.V_WIDTH * 0.4;
    this.cameraX += (targetCamX - this.cameraX) * 0.1;
    this.cameraX = Math.max(0, Math.min(this.cameraX, this.surfaceLevelWidth - this.V_WIDTH));

    // Update Animation State Machine (Idle, Run, Jump, Attack)
    this.updatePlayerAnimation(dt);

    const readout = document.getElementById('hud-vector-readout');
    if (readout) {
      const px = Math.floor(p.x);
      const py = Math.floor(p.y);
      const vx = p.vx.toFixed(1);
      const vy = p.vy.toFixed(1);
      readout.textContent = `POS: (${px}, ${py}) • VEL: (${vx}, ${vy}) • ANIM: ${p.animState.toUpperCase()}`;
    }
  }

  updatePlayerAnimation(dt) {
    const p = this.player;

    // 1. Attack Animation State
    if (p.isAttacking) {
      p.animState = 'attack';
      p.animTimer += dt;
      // 4 frames over 0.52 seconds (0.13s per frame)
      const frameIndex = Math.floor(p.animTimer / 0.13);
      if (frameIndex >= 4) {
        p.isAttacking = false;
        p.animTimer = 0;
        p.animFrame = 0;
      } else {
        p.animFrame = frameIndex;
        return;
      }
    }

    // 2. Airborne / Jump Animation State
    if (!p.onGround) {
      p.animState = 'jump';
      if (p.vy < -80) {
        p.animFrame = 1; // Rising jump pose
      } else if (Math.abs(p.vy) <= 80) {
        p.animFrame = 2; // Apex pose
      } else {
        p.animFrame = 0; // Falling pose
      }
      return;
    }

    // 3. Just Landed Crouch State
    if (p.justLandedTimer > 0) {
      p.animState = 'jump';
      p.animFrame = 3; // Ground landing crouch pose
      return;
    }

    // 4. Horizontal Run Animation State
    if (Math.abs(p.vx) > 15) {
      p.animState = 'run';
      p.animTimer += dt * (Math.abs(p.vx) / 34) * 1.3; // Synced with velocity
      p.animFrame = Math.floor(p.animTimer) % 4;
      return;
    }

    // 5. Idle Animation State
    p.animState = 'idle';
    p.animTimer += dt * 5.5; // Smooth idle breathing at ~5.5 FPS
    p.animFrame = Math.floor(p.animTimer) % 4;
  }

  resolveSurfaceHorizontalCollisions() {
    for (const plat of this.platforms) {
      if (plat.type === 'slope' || plat.type === 'platform' || plat.type === 'energy_platform') continue;
      if (
        this.player.x < plat.x + plat.w &&
        this.player.x + this.player.w > plat.x &&
        this.player.y < plat.y + plat.h &&
        this.player.y + this.player.h > plat.y + 6
      ) {
        if (this.player.vx > 0) {
          this.player.x = plat.x - this.player.w;
          this.player.vx = 0;
        } else if (this.player.vx < 0) {
          this.player.x = plat.x + plat.w;
          this.player.vx = 0;
        }
      }
    }
  }

  resolveSurfaceVerticalCollisions() {
    for (const plat of this.platforms) {
      if (plat.type === 'slope') {
        if (this.player.x + this.player.w > plat.x && this.player.x < plat.x + plat.w) {
          const relX = (this.player.x + this.player.w / 2 - plat.x) / plat.w;
          const slopeY = plat.y - (relX * plat.rise);
          if (this.player.y + this.player.h >= slopeY && this.player.y + this.player.h <= slopeY + 30) {
            this.player.y = slopeY - this.player.h;
            this.player.vy = 0;
            this.player.onGround = true;
          }
        }
        continue;
      }

      // One-way floating platforms (jump through from below, land on top)
      if (plat.type === 'platform' || plat.type === 'energy_platform') {
        if (
          this.player.x < plat.x + plat.w &&
          this.player.x + this.player.w > plat.x &&
          this.player.y + this.player.h >= plat.y &&
          this.player.y + this.player.h <= plat.y + 24 &&
          this.player.vy >= 0
        ) {
          this.player.y = plat.y - this.player.h;
          this.player.vy = 0;
          this.player.onGround = true;
        }
        continue;
      }

      // Solid ground blocks
      if (
        this.player.x < plat.x + plat.w &&
        this.player.x + this.player.w > plat.x &&
        this.player.y < plat.y + plat.h &&
        this.player.y + this.player.h > plat.y
      ) {
        if (this.player.vy > 0) {
          this.player.y = plat.y - this.player.h;
          this.player.vy = 0;
          this.player.onGround = true;
        } else if (this.player.vy < 0) {
          this.player.y = plat.y + plat.h;
          this.player.vy = 0;
        }
      }
    }
  }

  recoverSurfacePlayer() {
    this.audio.playHazardRepel();
    this.player.x = this.player.respawnX;
    this.player.y = this.player.respawnY - 40;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.jumpCooldown = 0;
    this.player.coyoteTimer = 0;
    this.player.jumpBufferTimer = 0;
    this.player.isInvulnerable = 1.0;

    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: this.player.x + this.player.w / 2,
        y: this.player.y + this.player.h / 2,
        vx: (Math.random() - 0.5) * 200,
        vy: (Math.random() - 0.5) * 200,
        life: 0.6,
        maxLife: 0.6,
        color: '#00f3ff',
        size: Math.random() * 4 + 2
      });
    }
  }

  updateSurfaceEntities(dt) {
    this.gameTime += dt;

    // Crystals
    for (const c of this.crystals) {
      if (c.collected) continue;
      c.phase += dt * 3.5;
      const floatY = c.y + Math.sin(c.phase) * 6;

      // Overlap with player or with Kamehameha beam during attack frame 2
      const isBeamHit = this.player.isAttacking && this.player.animFrame === 2 &&
        Math.abs(floatY - (this.player.y + 36)) < 40 &&
        ((this.player.facing > 0 && c.x > this.player.x && c.x < this.player.x + 380) ||
         (this.player.facing < 0 && c.x < this.player.x && c.x > this.player.x - 380));

      const isPlayerHit = this.player.x < c.x + c.w &&
        this.player.x + this.player.w > c.x &&
        this.player.y < floatY + c.h &&
        this.player.y + this.player.h > floatY;

      if (isPlayerHit || isBeamHit) {
        c.collected = true;
        this.crystalsCollected++;
        this.audio.playCrystalCollect();
        this.updateHUD();

        for (let i = 0; i < 16; i++) {
          this.particles.push({
            x: c.x + c.w / 2,
            y: floatY + c.h / 2,
            vx: (Math.random() - 0.5) * 180,
            vy: (Math.random() - 0.5) * 180,
            life: 0.5,
            maxLife: 0.5,
            color: '#00f3ff',
            size: Math.random() * 3 + 2
          });
        }
      }
    }

    // Hazard Barrier
    for (const obs of this.obstacles) {
      obs.timer = (obs.timer + dt) % obs.cycleTime;
      obs.isActive = obs.timer < obs.activeDuration;

      if (obs.isActive) {
        if (
          this.player.x < obs.x + obs.w &&
          this.player.x + this.player.w > obs.x &&
          this.player.y < obs.y + obs.h &&
          this.player.y + this.player.h > obs.y
        ) {
          if (this.player.isInvulnerable <= 0) {
            this.audio.playHazardRepel();
            this.player.vx = -420;
            this.player.vy = -260;
            this.player.isInvulnerable = 0.8;
          }
        }
      }
    }

    // Checkpoint Beacon
    if (this.checkpointBeacon) {
      const beaconX = this.checkpointBeacon.x;
      if (!this.checkpointBeacon.activated && this.player.x > beaconX - 20) {
        this.checkpointBeacon.activated = true;
        this.player.respawnX = beaconX + 40;
        this.player.respawnY = 580;
        this.audio.playCheckpointReached();
      }
    }

    // Ancient Gate
    if (this.ancientGate) {
      this.ancientGate.rotation += dt * 1.5;
      const gateCenterX = this.ancientGate.x + this.ancientGate.w / 2;
      if (
        !this.ancientGate.activated &&
        this.player.x + this.player.w > gateCenterX - 40
      ) {
        this.ancientGate.activated = true;
        this.checkpointReached = true;
        this.audio.playCheckpointReached();
        this.screens.checkpointBanner.classList.add('active');

        for (let i = 0; i < 60; i++) {
          this.particles.push({
            x: gateCenterX,
            y: this.ancientGate.y + this.ancientGate.h / 2,
            vx: (Math.random() - 0.5) * 350,
            vy: (Math.random() - 0.5) * 350,
            life: 1.5,
            maxLife: 1.5,
            color: Math.random() > 0.4 ? '#00f3ff' : '#facc15',
            size: Math.random() * 5 + 2
          });
        }
      }
    }

    // Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  updateHUD() {
    const crystalCount = document.getElementById('hud-crystal-count');
    const crystalIcons = document.getElementById('hud-crystal-icons');
    if (crystalCount) crystalCount.textContent = `${this.crystalsCollected} / ${this.totalCrystals}`;
    if (crystalIcons) {
      let str = '';
      for (let i = 0; i < this.totalCrystals; i++) {
        str += i < this.crystalsCollected ? '◆' : '◇';
      }
      crystalIcons.textContent = str;
    }
  }

  // --------------------------------------------------------------------------
  // RENDER PIPELINE
  // --------------------------------------------------------------------------
  draw() {
    this.ctx.clearRect(0, 0, this.V_WIDTH, this.V_HEIGHT);

    if (this.state === 'SPACE_FLIGHT' || (this.state === 'PAUSED' && this.previousState === 'SPACE_FLIGHT')) {
      this.drawSpaceScene();
    } else if (this.state === 'LANDING') {
      this.drawLandingScene();
    } else if (this.state === 'PLAYING' || (this.state === 'PAUSED' && this.previousState === 'PLAYING')) {
      this.drawPlanetSurface();
    }
  }

  // --------------------------------------------------------------------------
  // SPACE FLIGHT RENDER
  // --------------------------------------------------------------------------
  drawSpaceScene() {
    const camX = this.cameraX;
    const camY = this.cameraY;

    const bgGrad = this.ctx.createRadialGradient(
      this.V_WIDTH * 0.5, this.V_HEIGHT * 0.5, 100,
      this.V_WIDTH * 0.5, this.V_HEIGHT * 0.5, 900
    );
    bgGrad.addColorStop(0, '#061330');
    bgGrad.addColorStop(0.5, '#030a1c');
    bgGrad.addColorStop(1, '#02040b');
    this.ctx.fillStyle = bgGrad;
    this.ctx.fillRect(0, 0, this.V_WIDTH, this.V_HEIGHT);

    this.drawNebulaCloud(1200 - camX * 0.15, 600 - camY * 0.15, 450, 'rgba(168, 85, 247, 0.12)');
    this.drawNebulaCloud(3200 - camX * 0.2, 1100 - camY * 0.2, 550, 'rgba(0, 243, 255, 0.1)');

    this.drawSpaceStarfield(camX, camY);

    this.ctx.save();
    this.ctx.translate(-camX, -camY);

    // 1. Cygnus Prime Destination
    this.drawSpacePlanetCygnus();

    // 2. Gravitational Anomaly Field
    if (this.gravityWell) this.drawGravitationalWell(this.gravityWell);

    // 3. Asteroids
    this.asteroids.forEach(ast => this.drawAsteroid(ast));

    // 4. Moving Hazard Patrol Drone
    if (this.patrolDrone) this.drawPatrolDrone(this.patrolDrone);

    // 5. Stardust Canisters
    this.spaceCanisters.forEach(c => {
      if (!c.collected) this.drawCanister(c);
    });

    // 6. Upgraded High-Tech Sci-Fi Starfighter (Req 3)
    this.drawSpaceship();

    // 7. Space Particles
    this.drawParticles();

    this.ctx.restore();
  }

  drawSpaceStarfield(camX, camY) {
    this.ctx.fillStyle = '#ffffff';
    for (const s of this.starsFar) {
      const sx = ((s.x - camX * 0.08) % this.V_WIDTH + this.V_WIDTH) % this.V_WIDTH;
      const sy = ((s.y - camY * 0.08) % this.V_HEIGHT + this.V_HEIGHT) % this.V_HEIGHT;
      const alpha = s.alpha * (0.7 + Math.sin(this.gameTime * s.twinkleRate) * 0.3);
      this.ctx.globalAlpha = Math.max(0.1, alpha);
      this.ctx.fillRect(sx, sy, s.size, s.size);
    }

    for (const s of this.starsMid) {
      const sx = ((s.x - camX * 0.2) % this.V_WIDTH + this.V_WIDTH) % this.V_WIDTH;
      const sy = ((s.y - camY * 0.2) % this.V_HEIGHT + this.V_HEIGHT) % this.V_HEIGHT;
      const alpha = s.alpha * (0.6 + Math.cos(this.gameTime * s.twinkleRate) * 0.4);
      this.ctx.globalAlpha = Math.max(0.1, alpha);
      this.ctx.fillStyle = s.color || '#ffffff';
      this.ctx.fillRect(sx, sy, s.size, s.size);
    }

    for (const s of this.starsNear) {
      const sx = ((s.x - camX * 0.35) % this.V_WIDTH + this.V_WIDTH) % this.V_WIDTH;
      const sy = ((s.y - camY * 0.35) % this.V_HEIGHT + this.V_HEIGHT) % this.V_HEIGHT;
      this.ctx.globalAlpha = 0.85;
      this.ctx.fillStyle = s.color;
      this.ctx.fillRect(sx, sy, s.size, s.size);
    }
    this.ctx.globalAlpha = 1.0;
  }

  drawNebulaCloud(cx, cy, radius, color) {
    this.ctx.save();
    const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawSpacePlanetCygnus() {
    const p = this.cygnusPrime;
    this.ctx.save();

    // Landing Perimeter Vector Ring
    this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.4)';
    this.ctx.setLineDash([12, 12]);
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.landingRadius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    const rot = this.gameTime * 0.4;
    for (let i = 0; i < 4; i++) {
      const a = rot + (i * Math.PI) / 2;
      const cx = p.x + Math.cos(a) * p.landingRadius;
      const cy = p.y + Math.sin(a) * p.landingRadius;
      this.ctx.fillStyle = '#00f3ff';
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Atmospheric Corona Glow
    const coronaGrad = this.ctx.createRadialGradient(p.x, p.y, p.radius * 0.85, p.x, p.y, p.radius * 1.55);
    coronaGrad.addColorStop(0, 'rgba(0, 243, 255, 0.6)');
    coronaGrad.addColorStop(0.5, 'rgba(2, 132, 199, 0.25)');
    coronaGrad.addColorStop(1, 'transparent');
    this.ctx.fillStyle = coronaGrad;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.radius * 1.55, 0, Math.PI * 2);
    this.ctx.fill();

    // Spherical Planet Body
    const bodyGrad = this.ctx.createRadialGradient(
      p.x - p.radius * 0.35, p.y - p.radius * 0.35, p.radius * 0.1,
      p.x, p.y, p.radius
    );
    bodyGrad.addColorStop(0, '#ffffff');
    bodyGrad.addColorStop(0.25, '#38bdf8');
    bodyGrad.addColorStop(0.65, '#0284c7');
    bodyGrad.addColorStop(1, '#031738');

    this.ctx.fillStyle = bodyGrad;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Atmospheric Cloud Bands
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    this.ctx.clip();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    this.ctx.lineWidth = 14;
    for (let i = -p.radius; i < p.radius; i += 40) {
      this.ctx.beginPath();
      this.ctx.ellipse(p.x, p.y + i, p.radius * 1.25, p.radius * 0.28, 0.1, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    this.ctx.restore();

    this.ctx.font = 'bold 20px Orbitron';
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('CYGNUS PRIME', p.x, p.y - p.radius - 35);

    this.ctx.font = '14px Share Tech Mono';
    this.ctx.fillStyle = '#10b981';
    this.ctx.fillText('▼ ORBITAL INSERTION ZONE ▼', p.x, p.y - p.radius - 12);

    this.ctx.restore();
  }

  drawGravitationalWell(gw) {
    this.ctx.save();
    const pulse = Math.sin(this.gameTime * 4) * 10;
    this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([6, 6]);

    this.ctx.beginPath();
    this.ctx.arc(gw.x, gw.y, gw.gravityRadius + pulse, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(gw.x, gw.y, (gw.gravityRadius * 0.6) + pulse * 0.5, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    this.ctx.save();
    this.ctx.translate(gw.x, gw.y);
    this.ctx.rotate(gw.rot);
    const grad = this.ctx.createRadialGradient(0, 0, 5, 0, 0, gw.radius);
    grad.addColorStop(0, '#a855f7');
    grad.addColorStop(0.7, '#4c1d95');
    grad.addColorStop(1, '#1e1b4b');
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, gw.radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = '#c084fc';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.restore();

    this.ctx.font = '11px Share Tech Mono';
    this.ctx.fillStyle = '#c084fc';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GRAVITY ANOMALY', gw.x, gw.y - gw.radius - 12);

    this.ctx.restore();
  }

  drawAsteroid(ast) {
    this.ctx.save();
    this.ctx.translate(ast.x, ast.y);
    this.ctx.rotate(ast.rot);

    const grad = this.ctx.createRadialGradient(-ast.radius * 0.3, -ast.radius * 0.3, 5, 0, 0, ast.radius);
    grad.addColorStop(0, '#475569');
    grad.addColorStop(0.7, '#1e293b');
    grad.addColorStop(1, '#0f172a');
    this.ctx.fillStyle = grad;

    this.ctx.beginPath();
    for (let i = 0; i < ast.pts.length; i++) {
      const p = ast.pts[i];
      if (i === 0) this.ctx.moveTo(p.x, p.y);
      else this.ctx.lineTo(p.x, p.y);
    }
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawPatrolDrone(drone) {
    this.ctx.save();
    this.ctx.translate(drone.x, drone.y);

    this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-140, 0);
    this.ctx.stroke();

    this.ctx.fillStyle = '#1e1b4b';
    this.ctx.strokeStyle = '#ef4444';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(18, 0);
    this.ctx.lineTo(-14, 18);
    this.ctx.lineTo(-6, 0);
    this.ctx.lineTo(-14, -18);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = '#ef4444';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.font = '10px Share Tech Mono';
    this.ctx.fillStyle = '#ef4444';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('PATROL DRONE', 0, -24);

    this.ctx.restore();
  }

  drawCanister(c) {
    this.ctx.save();
    const floatY = c.y + Math.sin(this.gameTime * 4) * 4;

    const halo = this.ctx.createRadialGradient(c.x, floatY, 2, c.x, floatY, 20);
    halo.addColorStop(0, 'rgba(0, 243, 255, 0.7)');
    halo.addColorStop(1, 'transparent');
    this.ctx.fillStyle = halo;
    this.ctx.beginPath();
    this.ctx.arc(c.x, floatY, 20, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#00f3ff';
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.arc(c.x, floatY, c.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }

  // --------------------------------------------------------------------------
  // UPGRADED SPACESHIP RENDER (Req 3: New Starfighter Asset)
  // --------------------------------------------------------------------------
  drawSpaceship() {
    const s = this.ship;
    this.ctx.save();
    this.ctx.translate(s.x, s.y);
    this.ctx.rotate(s.angle);

    // Shield Bubble Shimmer when hit
    if (s.isInvulnerable > 0) {
      this.ctx.save();
      this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.7)';
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, s.radius + 16, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Dynamic Dual Thruster Exhaust Flames
    if (this.keys.thrust) {
      this.ctx.save();
      const flameLen = s.boostActive ? (42 + Math.random() * 18) : (26 + Math.random() * 10);
      const fColor = s.boostActive ? '#facc15' : '#00f3ff';

      for (const yOff of [-12, 12]) {
        const flameGrad = this.ctx.createLinearGradient(-24, yOff, -24 - flameLen, yOff);
        flameGrad.addColorStop(0, '#ffffff');
        flameGrad.addColorStop(0.3, fColor);
        flameGrad.addColorStop(1, 'transparent');
        this.ctx.fillStyle = flameGrad;

        this.ctx.beginPath();
        this.ctx.moveTo(-24, yOff - 4.5);
        this.ctx.lineTo(-24, yOff + 4.5);
        this.ctx.lineTo(-24 - flameLen, yOff);
        this.ctx.closePath();
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // Draw the High-Tech Sci-Fi Spaceship Sprite
    if (this.assets.spaceship && this.assets.spaceship.complete) {
      const renderW = 68;
      const renderH = 68;
      this.ctx.drawImage(this.assets.spaceship, -renderW / 2, -renderH / 2, renderW, renderH);
    } else {
      // High-detail procedural fallback
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = '#00f3ff';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(32, 0);
      this.ctx.lineTo(-20, 24);
      this.ctx.lineTo(-12, 8);
      this.ctx.lineTo(-24, 0);
      this.ctx.lineTo(-12, -8);
      this.ctx.lineTo(-20, -24);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  // --------------------------------------------------------------------------
  // LANDING SCENE RENDER
  // --------------------------------------------------------------------------
  drawLandingScene() {
    const p = this.landingProgress;
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.V_HEIGHT);
    grad.addColorStop(0, '#03081a');
    grad.addColorStop(0.5, '#07183d');
    grad.addColorStop(1, '#0284c7');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.V_WIDTH, this.V_HEIGHT);

    this.ctx.save();
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const cloudOffset = (this.gameTime * 600) % this.V_HEIGHT;
    for (let i = -1; i < 3; i++) {
      this.ctx.fillRect(0, i * 400 + cloudOffset, this.V_WIDTH, 140);
    }
    this.ctx.restore();

    const shipX = this.V_WIDTH * 0.5;
    const startY = 150;
    const endY = 640;
    const shipY = startY + (endY - startY) * p;

    // Thruster flame
    this.ctx.save();
    const flameH = (Math.sin(this.gameTime * 30) + 1.5) * 30;
    const flameGrad = this.ctx.createLinearGradient(shipX, shipY + 28, shipX, shipY + 28 + flameH);
    flameGrad.addColorStop(0, '#00f3ff');
    flameGrad.addColorStop(0.6, '#0ea5e9');
    flameGrad.addColorStop(1, 'transparent');
    this.ctx.fillStyle = flameGrad;
    this.ctx.beginPath();
    this.ctx.moveTo(shipX - 16, shipY + 28);
    this.ctx.lineTo(shipX + 16, shipY + 28);
    this.ctx.lineTo(shipX, shipY + 28 + flameH);
    this.ctx.closePath();
    this.ctx.fill();

    // Render spaceship in descent
    if (this.assets.spaceship && this.assets.spaceship.complete) {
      this.ctx.translate(shipX, shipY);
      this.ctx.rotate(Math.PI / 2); // Pointing down
      this.ctx.drawImage(this.assets.spaceship, -34, -34, 68, 68);
    } else {
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = '#00f3ff';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(shipX, shipY - 35);
      this.ctx.lineTo(shipX + 38, shipY + 25);
      this.ctx.lineTo(shipX - 38, shipY + 25);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  // --------------------------------------------------------------------------
  // ON-FOOT SURFACE RENDER WITH ANIMATED CHARACTER (Req 2)
  // --------------------------------------------------------------------------
  drawPlanetSurface() {
    const cam = this.cameraX;

    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, this.V_HEIGHT);
    skyGrad.addColorStop(0, '#020617');
    skyGrad.addColorStop(0.4, '#051336');
    skyGrad.addColorStop(0.8, '#0b2959');
    skyGrad.addColorStop(1, '#071e3d');
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, this.V_WIDTH, this.V_HEIGHT);

    const moonX = this.V_WIDTH * 0.75 - cam * 0.04;
    const moonY = 180;
    this.drawNebulaCloud(moonX, moonY, 70, 'rgba(56, 189, 248, 0.4)');

    this.drawParallaxMountains(cam * 0.15, '#041029', 420);
    this.drawParallaxMonoliths(cam * 0.35, '#071838', 500);

    this.ctx.save();
    this.ctx.translate(-cam, 0);

    this.drawEnergyChasm();

    for (const plat of this.platforms) {
      this.drawPlatform(plat);
    }

    // Landed Spaceship beside character
    this.drawLandedSpaceship();

    if (this.terminal) this.drawTerminal(this.terminal);
    if (this.checkpointBeacon) this.drawCheckpointBeacon(this.checkpointBeacon);
    if (this.ancientGate) this.drawAncientGate(this.ancientGate);

    for (const obs of this.obstacles) {
      this.drawObstacle(obs);
    }

    for (const c of this.crystals) {
      if (!c.collected) this.drawCrystal(c);
    }

    // 16-Frame Animated Character (Goku: Idle, Run, Jump, Attack)
    this.drawAnimatedPlayer();

    this.drawParticles();

    this.ctx.restore();
  }

  drawLandedSpaceship() {
    this.ctx.save();
    const x = 70;
    const y = 660;

    // Landing gear struts
    this.ctx.strokeStyle = '#38bdf8';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(x + 25, y);
    this.ctx.lineTo(x + 25, y + 6);
    this.ctx.moveTo(x + 75, y);
    this.ctx.lineTo(x + 75, y + 6);
    this.ctx.stroke();

    // Draw parked starfighter vessel
    if (this.assets.spaceship && this.assets.spaceship.complete) {
      this.ctx.save();
      this.ctx.translate(x + 50, y - 36);
      this.ctx.drawImage(this.assets.spaceship, -45, -45, 90, 90);
      this.ctx.restore();
    } else {
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = '#00f3ff';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + 24, y - 58);
      this.ctx.lineTo(x + 78, y - 58);
      this.ctx.lineTo(x + 102, y);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }

    this.ctx.font = '10px Orbitron';
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('ODYSSEY-01 [PARKED]', x + 50, y - 76);

    this.ctx.restore();
  }

  drawParallaxMountains(offset, color, baseHeight) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.V_HEIGHT);
    const step = 160;
    for (let x = -200; x <= this.V_WIDTH + 200; x += step) {
      const px = x - (offset % step);
      const h = baseHeight + Math.sin(x * 0.015) * 60 + Math.cos(x * 0.04) * 40;
      this.ctx.lineTo(px, h);
    }
    this.ctx.lineTo(this.V_WIDTH, this.V_HEIGHT);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  drawParallaxMonoliths(offset, color, baseHeight) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < 3200; x += 320) {
      const px = x - offset;
      if (px > -100 && px < this.V_WIDTH + 100) {
        this.ctx.fillRect(px, baseHeight - 90, 45, 200);
        this.ctx.strokeRect(px, baseHeight - 90, 45, 200);
      }
    }
    this.ctx.restore();
  }

  drawEnergyChasm() {
    const startX = 560;
    const endX = 760;
    const grad = this.ctx.createLinearGradient(0, 660, 0, 900);
    grad.addColorStop(0, 'rgba(0, 243, 255, 0.4)');
    grad.addColorStop(1, 'transparent');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(startX, 660, endX - startX, 240);
  }

  drawPlatform(plat) {
    this.ctx.save();
    if (plat.type === 'slope') {
      this.ctx.beginPath();
      this.ctx.moveTo(plat.x, plat.y);
      this.ctx.lineTo(plat.x + plat.w, plat.y - plat.rise);
      this.ctx.lineTo(plat.x + plat.w, plat.y + plat.h);
      this.ctx.lineTo(plat.x, plat.y + plat.h);
      this.ctx.closePath();

      const slopeGrad = this.ctx.createLinearGradient(plat.x, plat.y - plat.rise, plat.x, plat.y + plat.h);
      slopeGrad.addColorStop(0, '#0c224a');
      slopeGrad.addColorStop(1, '#050c1e');
      this.ctx.fillStyle = slopeGrad;
      this.ctx.fill();

      this.ctx.strokeStyle = '#00f3ff';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(plat.x, plat.y);
      this.ctx.lineTo(plat.x + plat.w, plat.y - plat.rise);
      this.ctx.stroke();
      this.ctx.restore();
      return;
    }

    if (plat.type === 'energy_platform') {
      this.ctx.fillStyle = 'rgba(10, 25, 55, 0.85)';
      this.ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      this.ctx.strokeStyle = '#00f3ff';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);
      this.ctx.restore();
      return;
    }

    const pGrad = this.ctx.createLinearGradient(plat.x, plat.y, plat.x, plat.y + plat.h);
    pGrad.addColorStop(0, '#091b38');
    pGrad.addColorStop(1, '#020712');
    this.ctx.fillStyle = pGrad;
    this.ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

    this.ctx.strokeStyle = '#00f3ff';
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(plat.x, plat.y);
    this.ctx.lineTo(plat.x + plat.w, plat.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawTerminal(term) {
    this.ctx.save();
    const tx = term.x;
    const ty = term.y;
    this.ctx.fillStyle = '#0f172a';
    this.ctx.strokeStyle = '#00f3ff';
    this.ctx.lineWidth = 1.5;
    this.ctx.fillRect(tx, ty, term.w, term.h);
    this.ctx.strokeRect(tx, ty, term.w, term.h);

    const holoY = ty - 45 + Math.sin(this.gameTime * 4) * 4;
    this.ctx.fillStyle = 'rgba(0, 243, 255, 0.2)';
    this.ctx.strokeStyle = '#00f3ff';
    this.ctx.lineWidth = 1.5;
    this.ctx.fillRect(tx - 15, holoY, term.w + 30, 36);
    this.ctx.strokeRect(tx - 15, holoY, term.w + 30, 36);

    this.ctx.fillStyle = '#00f3ff';
    this.ctx.font = 'bold 12px Orbitron';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('θ=30°', tx + term.w / 2, holoY + 22);

    const dist = Math.abs((this.player.x + this.player.w / 2) - (tx + term.w / 2));
    if (dist < 80) {
      this.ctx.fillStyle = '#facc15';
      this.ctx.font = '11px Share Tech Mono';
      this.ctx.fillText('[E] INSPECT VECTOR', tx + term.w / 2, holoY - 12);
    }
    this.ctx.restore();
  }

  drawCheckpointBeacon(beacon) {
    this.ctx.save();
    const bx = beacon.x;
    const by = beacon.y;
    this.ctx.fillStyle = '#0e1f3d';
    this.ctx.strokeStyle = beacon.activated ? '#10b981' : '#38bdf8';
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(bx, by, beacon.w, beacon.h);
    this.ctx.strokeRect(bx, by, beacon.w, beacon.h);

    const topY = by - 16;
    const pulse = Math.sin(this.gameTime * 8) * 3;
    this.ctx.fillStyle = beacon.activated ? '#10b981' : '#38bdf8';
    this.ctx.beginPath();
    this.ctx.arc(bx + beacon.w / 2, topY, 8 + (beacon.activated ? pulse : 0), 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawAncientGate(gate) {
    this.ctx.save();
    const gx = gate.x;
    const gy = gate.y;
    const cx = gx + gate.w / 2;
    const cy = gy + gate.h / 2;

    this.ctx.fillStyle = '#09152b';
    this.ctx.strokeStyle = '#00f3ff';
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(gx, gy + 30, 24, gate.h - 30);
    this.ctx.strokeRect(gx, gy + 30, 24, gate.h - 30);
    this.ctx.fillRect(gx + gate.w - 24, gy + 30, 24, gate.h - 30);
    this.ctx.strokeRect(gx + gate.w - 24, gy + 30, 24, gate.h - 30);

    this.ctx.fillStyle = '#0e244d';
    this.ctx.beginPath();
    this.ctx.moveTo(cx, gy - 30);
    this.ctx.lineTo(gx + gate.w + 10, gy + 35);
    this.ctx.lineTo(gx - 10, gy + 35);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(gate.rotation);
    this.ctx.strokeStyle = gate.activated ? '#10b981' : '#00f3ff';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 48, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();

    this.ctx.restore();
  }

  drawObstacle(obs) {
    this.ctx.save();
    const ox = obs.x;
    const oy = obs.y;
    this.ctx.fillStyle = '#1e1b4b';
    this.ctx.strokeStyle = '#ef4444';
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(ox - 6, oy, obs.w + 12, 16);
    this.ctx.fillRect(ox - 6, oy + obs.h - 16, obs.w + 12, 16);

    if (obs.isActive) {
      this.ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
      this.ctx.fillRect(ox, oy + 16, obs.w, obs.h - 32);
    }
    this.ctx.restore();
  }

  drawCrystal(c) {
    this.ctx.save();
    const cx = c.x + c.w / 2;
    const cy = c.y + c.h / 2 + Math.sin(c.phase) * 6;

    this.ctx.fillStyle = '#00f3ff';
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - 16);
    this.ctx.lineTo(cx + 11, cy);
    this.ctx.lineTo(cx, cy + 16);
    this.ctx.lineTo(cx - 11, cy);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  // --------------------------------------------------------------------------
  // ANIMATED CHARACTER RENDER (Goku 16-Frame Engine with Zero-Jitter Alignment)
  // --------------------------------------------------------------------------
  drawAnimatedPlayer() {
    const p = this.player;
    this.ctx.save();

    if (p.isInvulnerable > 0 && Math.floor(this.gameTime * 20) % 2 === 0) {
      this.ctx.restore();
      return;
    }

    const footX = p.x + p.w / 2;
    const footY = p.y + p.h; // Bottom ground contact line

    this.ctx.translate(footX, footY);
    this.ctx.scale(p.facing, 1);

    // Get current animation frame
    const frames = this.assets.player[p.animState];
    const frameObj = (frames && frames[p.animFrame]) ? frames[p.animFrame] : null;

    if (frameObj && frameObj.img.complete) {
      // Standard target height on screen
      const targetHeight = 84;
      const scale = targetHeight / (frameObj.meta.h || 240);
      const renderW = (frameObj.meta.w || 120) * scale;
      const renderH = (frameObj.meta.h || 240) * scale;

      const pivotX = (frameObj.meta.pivotX || (frameObj.meta.w / 2)) * scale;
      const pivotY = (frameObj.meta.pivotY || frameObj.meta.h) * scale;

      // Draw anchored at feet: pivotY aligns exactly with footY (0 in translated space)
      this.ctx.drawImage(frameObj.img, -pivotX, -pivotY, renderW, renderH);

      // In attack frame 2, draw radiant cyan energy aura and particles
      if (p.isAttacking && p.animFrame === 2) {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.6)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.ellipse(30, -38, 25, 15, 0, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore();
      }
    } else {
      // Clean fallback if images are loading
      this.ctx.fillStyle = '#f97316';
      this.ctx.strokeStyle = '#00f3ff';
      this.ctx.lineWidth = 2;
      this.ctx.fillRect(-p.w / 2, -p.h, p.w, p.h);
      this.ctx.strokeRect(-p.w / 2, -p.h, p.w, p.h);
    }

    this.ctx.restore();
  }

  drawParticles() {
    this.ctx.save();
    for (const p of this.particles) {
      const alpha = p.life / p.maxLife;
      this.ctx.globalAlpha = Math.max(0, alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  // --------------------------------------------------------------------------
  // MAIN LOOP
  // --------------------------------------------------------------------------
  loop(currentTime) {
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.05);
    this.lastTime = currentTime;

    if (this.state === 'SPACE_FLIGHT') {
      this.updateSpaceship(dt);
      this.updateSpaceWorld(dt);
    } else if (this.state === 'LANDING') {
      this.updateLandingSequence(dt);
    } else if (this.state === 'PLAYING') {
      if (!this.terminalOpen) {
        this.updateSurfacePlayer(dt);
        this.updateSurfaceEntities(dt);
      }
    }

    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }
}

// ============================================================================
// BOOTSTRAPPER
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new VectorOdysseyGame();
});
