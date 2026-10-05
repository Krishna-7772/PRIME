@echo off
title Push ECDAT to GitHub (Krishna-7772/PRIME)
color 0b

echo ======================================================================
echo    Pushing ECDAT to GitHub: Krishna-7772/PRIME
echo ======================================================================
echo.

cd /d "%~dp0"

git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Krishna-7772/PRIME.git

echo Remote origin configured:
git remote -v
echo.

echo Pushing commits to https://github.com/Krishna-7772/PRIME.git ...
echo (If prompted, please log into GitHub in the browser window that appears)
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo    SUCCESS! Code pushed to https://github.com/Krishna-7772/PRIME
    echo ======================================================================
) else (
    echo.
    echo ======================================================================
    echo    PUSH FAILED!
    echo    Please ensure:
    echo    1. You created the repository 'PRIME' on https://github.com/new
    echo    2. You are logged into the 'Krishna-7772' account
    echo ======================================================================
)

echo.
pause
