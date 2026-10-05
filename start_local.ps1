Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "   ECDAT - Enterprise Cryptographic Discovery & Analysis Tool" -ForegroundColor White
Write-Host "   Smart India Hackathon 2026 | SIH26164 (NTRO)" -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "[1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptDir'; `$env:PYTHONPATH='backend'; .\backend\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000"

Start-Sleep -Seconds 2

Write-Host "[2/2] Starting Vite React Frontend on http://127.0.0.1:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptDir\frontend'; npm run dev -- --host 127.0.0.1 --port 5173"

Start-Sleep -Seconds 3

Write-Host "Opening ECDAT in your default web browser..." -ForegroundColor Cyan
Start-Process "http://127.0.0.1:5173/"

Write-Host ""
Write-Host "ECDAT is running! Press enter to exit this launcher window." -ForegroundColor Gray
Read-Host
