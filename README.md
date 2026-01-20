# HeritEon | Chrome Native Formatter

![Platform](https://img.shields.io/badge/Platform-Windows-0078D6)
![License](https://img.shields.io/badge/License-BSD--3--Clause-green)
![Status](https://img.shields.io/badge/Status-Offline-orange)

A standalone, **100% offline** code beautifier powered by the native Chromium DevTools formatting engine.

Built for developers who want a lightweight, privacy-focused formatter for **JavaScript, HTML and CSS** — without Node.js, online converters, or heavy IDE plugins.

---

## Why this tool?

Most formatters either depend on a Node.js toolchain or send code through online services. This project takes a different approach: it reuses the **actual formatting engine** shipped with Chromium DevTools (`formatter_worker.js`) and wraps it in a clean **HeritEon** UI.

- **Zero Runtime Dependencies:** no `npm install`, no Python, no servers.
- **Total Privacy:** your code never leaves your machine.
- **Native Engine:** same formatter logic as Chrome DevTools (F12).
- **Air-Gapped Ready:** works on offline / isolated machines.

---

## Features

- **Languages:** JavaScript, HTML, CSS  
- **Indentation:** 2 spaces / 4 spaces / Tabs  
- **Syntax Highlighting:** Prism.js (source + output)
- **JS Validation:** Acorn parse check before formatting (clear error feedback)
- **Copy / Download:** one-click copy to clipboard + download formatted file
- **Offline Modules:** runs from local files using a robust launcher script

---

## How it works (high level)

- UI runs locally (`index.html`)
- Formatting is performed by Chromium DevTools modules (`devtools/bundled/...`)
- The launcher starts Chrome with the required flags so local module loading works without CORS/file restrictions.

---

## Installation & Usage

### Prerequisites
- Windows (x64 or x86)
- Google Chrome installed (standard or portable)

### Run
1. Clone or download this repository
2. Open the folder
3. Double-click **`launch_beautifier.bat`**

> **Important:** Do **not** open `index.html` directly.  
> The launcher is required to start Chrome in isolated mode with `--allow-file-access-from-files`, otherwise Chromium module imports can fail due to local file/CORS restrictions.

---

## Project structure (key parts)

- `index.html` — UI + wiring
- `prism/` — Prism.js (offline syntax highlighting)
- `acorn/` — Acorn ES parser (offline JS validation)
- `devtools/bundled/...` — Chromium DevTools formatter modules
- `launch_beautifier.bat` — launcher with the required Chrome flags

---

## License & Attribution

This project is a composite work:

### 1) User Interface (UI)
HTML/CSS/JS glue + launcher logic created by **HeritEon**.  
Copyright © 2026 HeritEon.

### 2) Formatting Engine
The formatting logic under `devtools/bundled/...` is extracted from **The Chromium Project** and is licensed under **BSD-3-Clause**.  
- Source: [Chromium](https://www.chromium.org/Home)  
- License: [BSD-3-Clause](https://opensource.org/licenses/BSD-3-Clause)

### 3) Prism.js and Acorn
This repository includes Prism.js and Acorn for offline highlighting and validation.  
Their original licenses apply to their respective folders.

> This tool is not affiliated with, endorsed by, or connected to Google LLC.  
> “Chrome” is a trademark of Google LLC.

---

**Developed with precision by HeritEon.**
