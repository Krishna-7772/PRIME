Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "   Pushing ECDAT to GitHub: Krishna-7772/PRIME" -ForegroundColor White
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/Krishna-7772/PRIME.git

Write-Host "Configured Remote:" -ForegroundColor Yellow
git remote -v

Write-Host ""
Write-Host "Pushing main branch to https://github.com/Krishna-7772/PRIME.git ..." -ForegroundColor Green
Write-Host "(A browser or credential prompt may appear to sign in to Krishna-7772)" -ForegroundColor Gray
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "======================================================================" -ForegroundColor Green
    Write-Host "   SUCCESS! Code pushed to https://github.com/Krishna-7772/PRIME" -ForegroundColor Green
    Write-Host "======================================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "======================================================================" -ForegroundColor Red
    Write-Host "   PUSH FAILED!" -ForegroundColor Red
    Write-Host "   Please ensure:" -ForegroundColor Red
    Write-Host "   1. You have created 'PRIME' on https://github.com/new" -ForegroundColor Yellow
    Write-Host "   2. You sign in with the 'Krishna-7772' GitHub account" -ForegroundColor Yellow
    Write-Host "======================================================================" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press enter to exit." -ForegroundColor Gray
Read-Host
