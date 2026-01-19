# HeritEon | Chrome Native Formatter

![Platform](https://img.shields.io/badge/Platform-Windows-0078D6)
![License](https://img.shields.io/badge/License-BSD--3--Clause-green)
![Status](https://img.shields.io/badge/Status-Offline-orange)

A standalone, **100% offline** code beautifier powered by the native Chromium DevTools formatting engine. 

Designed for developers who need a lightweight, privacy-focused tool to format JavaScript, HTML, and CSS without relying on Node.js dependencies, online converters, or heavy IDE plugins.

---

## Why this tool?

Most formatters require an internet connection or a complex Node.js environment. This tool takes a different approach: it extracts the **actual formatting logic (`formatter_worker.js`)** used inside Google Chrome's DevTools and wraps it in a clean, modern **HeritEon** interface.

* **Zero Dependencies:** No `npm install`, no python, no servers.
* **Total Privacy:** Your code never leaves your local machine.
* **Native Performance:** Uses the same engine as the Chrome F12 tools.
* **Air-Gapped Ready:** Works perfectly on computers without internet access.

## Features

* **Supported Languages:** JavaScript, HTML, CSS.
* **Configurable Indentation:** 2 spaces, 4 spaces, or Tabs.
* **Dark Mode UI:** Designed with the HeritEon "Midnight Navy" theme.
* **Export Options:** One-click Copy to Clipboard and File Download.
* **Smart Launch:** Includes a robust launcher script to handle browser security flags automatically.

## Installation & Usage

### Prerequisites
* Windows OS (64-bit or 32-bit).
* Google Chrome installed (Standard or Portable).

### How to Run
1.  Clone or download this repository.
2.  Navigate to the folder.
3.  Double-click **`launch_beautifier.bat`**.

> **Note:** Do not open `index.html` directly. The launcher script is required to start Chrome in an isolated mode with the `--allow-file-access-from-files` flag. This allows the tool to load the extracted Chromium modules locally without CORS errors.

## License & Attribution

This project is a composite work:

### 1. The User Interface (UI)
The HTML, CSS styling, and Launcher logic are created by **HeritEon**.
* Copyright © 2026 HeritEon. All rights reserved.

### 2. The Formatting Engine
The core formatting logic (`devtools/bundled/...`) is extracted from **The Chromium Project**.
* **Source:** [Chromium](https://www.chromium.org/Home)
* **License:** [BSD-3-Clause](https://opensource.org/licenses/BSD-3-Clause)

> *This tool is not affiliated with, endorsed by, or connected to Google LLC. "Chrome" is a trademark of Google LLC.*

---

**Developed with precision by HeritEon.**