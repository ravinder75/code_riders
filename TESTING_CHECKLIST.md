# TESTING CHECKLIST — VECTOR ODYSSEY: WORLDS OF GRAVITY
**RESPAWN — PRAVRUTTI 2.0 | Team 6: CODE RIDERS**

## Automated & Manual Testing Matrix

### 🚀 Spaceship & Navigation Flight
- [x] **1. Direct Startup Check:** Game loads immediately with the spaceship visible and controllable in deep space without menus.
- [x] **2. New Starfighter Asset Check:** High-resolution transparent PNG starfighter (`assets/spaceship.png`) renders with proper orientation, dual plasma flames, and boost flares.
- [x] **3. Tactical Sector Radar Check:** Real-time minimap radar in top-right displays player location, orientation chevron, asteroids, Cygnus Prime, and the other 4 celestial worlds.
- [x] **4. Expanded Sector Map Check:** Pressing `M` or clicking the minimap opens the full galaxy sector map.
- [x] **5. Asteroid Collision & Damage Check:** Hitting an asteroid causes red impact sparks, damage sound, shield loss, and a physics knockback impulse.
- [x] **6. Gravitational Anomaly Check:** Flying near the purple anomaly asteroid bends the flight path inward according to gravitational force vectors.
- [x] **7. Cygnus Prime Touchdown Check:** Flying into Cygnus Prime's landing perimeter triggers atmospheric entry and descends onto the surface landing pad.

### 🥋 Animated On-Foot Exploration (Cygnus Prime)
- [x] **8. Asset Verification Check:** All 16 transparent PNG frames in `assets/player/` (`idle_0..3`, `run_0..3`, `jump_0..3`, `attack_0..3`) load properly with zero broken paths.
- [x] **9. Idle Animation Check:** When stationary on ground, character plays 4-frame breathing/stance animation at 5.5 FPS.
- [x] **10. Run Animation Check:** Moving horizontally plays 4-frame running animation synced with player speed.
- [x] **11. Jump Animation Check:** Airborne state plays distinct poses: frame 1 (rising), frame 2 (apex), frame 0 (falling), frame 3 (landing crouch).
- [x] **12. Attack Animation Check:** Pressing `J`, `Z`, `F`, or clicking executes the 4-frame Kamehameha sequence (charge, push, beam wave, recovery) and returns to idle/run.
- [x] **13. Zero-Jitter Alignment Check:** Character's feet baseline remains anchored to platforms without jumping or vertical jitter across all animation states.
- [x] **14. Hitbox & Physics Consistency Check:** Fixed AABB collision box ($w=38, h=68$) ensures solid platform collisions, chasm jumping, and obstacle interactions remain precise.
- [x] **15. Crystal Collection & Gate Check:** Collecting all 5 crystals increments counter, and entering the ancient gate activates spinning vector rings and marks checkpoint reached.
- [x] **16. State Reset Check:** Replaying or restarting resets flight state cleanly with zero runtime errors.
