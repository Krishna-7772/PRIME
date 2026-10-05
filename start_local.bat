@echo off
title ECDAT - Enterprise Cryptographic Discovery ^& Analysis Tool
color 0b

echo ======================================================================
echo    ECDAT - Enterprise Cryptographic Discovery ^& Analysis Tool
echo    Smart India Hackathon 2026 ^| SIH26164 (NTRO)
echo ======================================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "ECDAT Backend" cmd /k "set PYTHONPATH=backend && backend\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000"

timeout /t 2 /nobreak >nul

echo [2/2] Starting Vite React Frontend on http://127.0.0.1:5173 ...
start "ECDAT Frontend" cmd /k "cd frontend && npm run dev -- --host 127.0.0.1 --port 5173"

timeout /t 3 /nobreak >nul

echo.
echo Both servers are launching!
echo Opening ECDAT in your default web browser...
start http://127.0.0.1:5173/

echo.
echo Press any key to exit this launcher window (servers will remain running).
pause >nul
