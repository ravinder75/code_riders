# VECTOR ODYSSEY: WORLDS OF GRAVITY 🚀
**RESPAWN — PRAVRUTTI 2.0 SCI-FI HACKATHON**  
**Team:** CODE RIDERS (Team 6)  
**Theme:** SCI-FI  
**Genre:** 2D Sci-Fi Space Flight & Animated Planetary Exploration  

---

## 🌌 Overview

**Vector Odyssey: Worlds of Gravity** combines direct 2D zero-g space flight with animated on-foot planetary exploration.

### 🌟 Latest Feature Updates:
1. **Real-Time Tactical Sector Radar ([M]):** A live radar widget and full-screen sector map showing your spaceship's position, range rings, asteroids, and the 5 planetary destinations (**Cygnus Prime**, **Crimson Frontier**, **Nebula-9**, **Frost Titan**, **Eclipse Core**).
2. **New High-Tech Starfighter Spaceship:** Upgraded sleek sci-fi interceptor sprite (`assets/spaceship.png`) with dynamic dual plasma exhausts, afterburner boost flares, and shield matrix.
3. **16-Frame Animated Character Integration:** 
   - **Idle:** 4 breathing/stance frames.
   - **Run:** 4 horizontal running frames synchronized with player velocity.
   - **Jump:** 4 airborne poses (ascend, apex, fall, landing crouch).
   - **Attack:** 4-frame **Kamehameha** energy blast sequence (charge, push, massive cyan beam discharge, power stance).
4. **Zero-Jitter Grounding Architecture:** Every animation frame uses exact mathematical feet pivot alignment (`pivotY == height`) so the character remains grounded on platforms without jittering or vertical popping.
5. **Direct Gameplay Opening:** Starts immediately inside the controllable spaceship — zero menus or selection screens.

---

## 🕹️ Controls Guide

### 🚀 Spaceship Flight Mode (Active on Startup):
| Input Key | Action | Physics Description |
| :--- | :--- | :--- |
| **W / Up Arrow** | Accelerate Forward | Vector thrust $\vec{a} = (a \cos\theta, a \sin\theta)$ |
| **A / Left Arrow** | Steer Left | Rotates orientation counter-clockwise |
| **D / Right Arrow** | Steer Right | Rotates orientation clockwise |
| **S / Down Arrow** | Retro-Brake | Active reverse braking |
| **Space** | Afterburner Boost | Expands speed limit from $420 \to 660\text{ px/s}$ with golden exhaust flares |
| **M** | Sector Tactical Radar | Toggles real-time galaxy sector radar & full map |
| **ESC / P** | Pause Expedition | Freezes flight telemetry and opens modal |

### 🥋 On-Foot Surface Exploration (Cygnus Prime):
| Input Key | Action | Detail |
| :--- | :--- | :--- |
| **A / D** or **← / →** | Walk / Run | Plays 4-frame running animation synced to velocity |
| **W / Space / ↑** | Jump | Plays 4-frame airborne animation (rise, apex, fall, landing crouch) |
| **J / Z / F / Left Click** | **Attack (Kamehameha)** | Charges and fires massive cyan energy wave |
| **E** | Interact | Inspects Holographic Mathematical Terminals |
| **ESC / P** | Pause | Opens surface pause menu |

---

## ⚡ Quick Start

### 1. Launch Local Web Server
```bash
python -m http.server 8085
```
*(or via npm)*:
```bash
npm start
```

### 2. Open in Any Modern Browser
👉 **[http://localhost:8085](http://localhost:8085)**

### 3. Run Automated Test Harness
```bash
npm test
```
*(Runs continuous test suite verifying animation frame integrity, zero-jitter grounding, state machine transitions, radar coordinate scaling, and starfighter assets).*

---

## 👥 Credits
**Team 6 — CODE RIDERS**  
Built for **RESPAWN | PRAVRUTTI 2.0**
