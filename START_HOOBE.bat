@echo off
setlocal
cd /d "%~dp0"
title Hoo.be Engine - Port 3000

:: Silent Pre-Flight Cleanup (User Rule 12)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000 " ^| findstr "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo ========================================================
echo    HOOBE CLONE - LUXURY LINK-IN-BIO ENGINE
echo ========================================================
echo.
echo [1/2] Starting Next.js Server on http://localhost:3000...
echo [2/2] Admin Panel: http://localhost:3000/admin
echo.

start "" http://localhost:3000/admin

npm run start
pause
