@echo off
title Launching MARVIS Website...
echo =======================================================
echo          STARTING MARVIS WEBSITE LOCAL SERVER
echo =======================================================
echo.
echo Launching local server...
echo.

cd /d "%~dp0"
start "" "http://localhost:5173"
call npm run dev

pause
