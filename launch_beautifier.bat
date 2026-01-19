@echo off
setlocal

:: ============================================================
:: HeritEon Native Formatter Launcher
:: Copyright (c) 2026 HeritEon. All rights reserved.
::
:: Description:
:: Launches the offline formatter in an isolated Chrome instance
:: with local file access enabled.
:: ============================================================

:: --- CONFIGURATION ---
set "HTML_FILE=index.html"

:: Define a temporary profile path to ensure isolation from the user's main Chrome instance.
:: This allows the specific flags to function correctly without closing the main browser.
set "TEMP_PROFILE=%TEMP%\Chrome_Offline_DevTools_Profile"

echo Launching HeritEon Formatter...

:: --- EXECUTION ---
:: Launch Chrome using the system alias.
:: Flags explanation:
:: --allow-file-access-from-files : Bypasses CORS for local ES6 module loading.
:: --user-data-dir : Forces a new process instance using a clean profile.
start chrome --allow-file-access-from-files --user-data-dir="%TEMP_PROFILE%" "%~dp0%HTML_FILE%"

:: Terminate script execution
exit