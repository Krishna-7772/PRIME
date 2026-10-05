# Automated script to build and deploy PRIME frontend directly to GitHub Pages (gh-pages branch)
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  PRIME: Deploying Frontend Prototype to GitHub Pages     " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Build frontend bundle
Write-Host "[1/3] Building production bundle in frontend/..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Aborting." -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# 2. Deploy to gh-pages branch
Write-Host "[2/3] Preparing deployment to gh-pages branch..." -ForegroundColor Yellow
$tempDir = Join-Path $env:TEMP "prime-gh-pages"
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Path $tempDir | Out-Null
Copy-Item -Recurse -Force frontend/dist/* $tempDir/

Set-Location $tempDir
git init | Out-Null
git checkout -b gh-pages | Out-Null
git add .
git commit -m "Deploy PRIME prototype to GitHub Pages" | Out-Null
git remote add origin https://github.com/Krishna-7772/PRIME.git

Write-Host "[3/3] Pushing to origin gh-pages..." -ForegroundColor Yellow
git push -f origin gh-pages

Set-Location "c:\Users\krish\Desktop\Projects\SIH"
Remove-Item -Recurse -Force $tempDir

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  SUCCESSFULLY DEPLOYED TO gh-pages BRANCH!               " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "Your prototype link is:" -ForegroundColor White
Write-Host "https://krishna-7772.github.io/PRIME/" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you have not enabled GitHub Pages yet:" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/Krishna-7772/PRIME/settings/pages"
Write-Host "2. Under 'Build and deployment' -> 'Source': Select 'Deploy from a branch'"
Write-Host "3. Under 'Branch': Select 'gh-pages' and '/ (root)', then click Save."
Write-Host ""
