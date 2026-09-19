# 🛡️ CrisisRelay — Advanced Fail-Safe Guard Protocol

### 🏆 Official Submission for Bharat Builds Tour: First Commit Hackathon (Track 1: Build It)

---

## 📌 Project Overview
Traditional personal safety applications suffer from two critical system vulnerabilities: they exhaust mobile battery cells via continuous background GPS tracking, and they fail instantly if an attacker physically destroys the device or forces the user to close the app before hitting an "SOS" button. 

**CrisisRelay** completely changes this model by shifting the security architecture from the host mobile device onto a secure serverless cloud infrastructure layer. By launching background check-in timer routines that run independently of the phone, emergency alerts and multi-lingual voice dispatches are executed automatically—even if the user's phone is smashed, turned off, or disconnected from the network.

---

## 🌟 Core High-Impact Features

* **⏱️ The Background Cloud Timer:** Moves the countdown logic off the local device. The fallback countdown triggers emergency workflows automatically upon expiration unless disarmed with the user's secure pass token.

* **🎭 Covert Duress Cloaking:** If forced by an attacker to disarm the application, entering a custom-configured Duress PIN (`9999`) instantly transitions the UI into a fake "charging error/dead battery" screen. This visual deception bypasses attacker scrutiny while silently firing background crisis hooks.

* **🎙️ Duress-Gated Forensic Recording Track:** Triggered exclusively within the Duress PIN workflow, the system instantly engages a low-profile ambient mic capture layer, tracking environmental room audio and compiling it into a secure `.mp3` forensic evidence file.

* **📢 Multilingual Safety Dispatches:** Integrates localized text-to-speech engine algorithms capable of converting real-time GPS coordinate data into fluent English, Hindi (हिंदी), and Marathi (मराठी) voice broadcasts to eliminate regional language delays.

* **📳 Haptic & Shake Sensor Integration:** Uses native device vibration metrics to verify system state changes and captures hardware kinetic movements (`devicemotion`) to trigger panic overrides if the user cannot physically interact with the screen.

---

## 🛠️ Technical Architecture & Open-Source Stack

* **Frontend Client UI:** Premium glassmorphic interface styled with an immersive canvas theme, custom segmented language controls, an active safety phrase matrix, and a neon frequency audio wave visualizer.

* **Serverless Backend Stack:** Programmed in Python 3.14, utilizing environment-agnostic handlers designed to run inside cloud compute spaces.

* **AWS Local Cloud Simulation:** Orchestrated to run inside **LocalStack** containers via **Docker**, mapping native endpoints directly to **AWS Lambda runtimes** and **Amazon API Gateway proxies** on localhost without requiring live cloud account credentials.

* **Cryptographic Memory Management:** Implements an interactive client-side cryptographic hashing script (`cypherScramble`) that instantly scrambles pin configurations into custom mathematical integers, ensuring raw text passes are never held in volatile device memory.

---

## 🔒 Privacy Architecture & Data Ethics

* **Zero Standing Tracking:** CrisisRelay operates on a strict zero-trust model. Geolocation coordinate data is never logged continuously; it is extracted and shipped exclusively at the exact microsecond of an active crisis event or an un-disarmed timer expiration.

* **Volatile Session Lifecycles:** As soon as a valid Safe Disarm PIN is submitted, all temporary cloud check-in tracking instances and location tokens are completely dropped from system memory layers.

* **Decoupled Consent Isolation:** Ambient audio recording remains completely dormant during normal utility profiles to protect daily user privacy, activating only under verified duress inputs.
