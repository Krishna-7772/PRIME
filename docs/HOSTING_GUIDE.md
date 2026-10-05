# PRIME: Zero-Cost Cloud Hosting & Prototype Deployment Guide
**Product**: Postquantum Readiness Intelligence & Migration Engine (PRIME)  
**SIH Problem Statement**: SIH26164 | **Organization**: NTRO | **Team**: PRAYAS

---

## 1. Fast Summary: The 3 Best Free Hosting Options

| Platform | URL Format | Setup Time | Cost | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub Pages** *(Already Pushed & Ready!)* | `https://krishna-7772.github.io/PRIME/` | **30 Seconds (1 Toggle in Settings)** | **$0 Forever** | **Hackathon Submission Link (Never sleeps, 100% uptime)** |
| **Vercel** | `https://prime-security.vercel.app` | **1 Minute (1 Click)** | **$0 Forever** | **Ultra-fast Edge CDN Link** |
| **Render.com** | `https://prime-backend.onrender.com` | **3 Minutes (1 Click Blueprint)** | **$0 Forever** | **Live Python FastAPI + PostgreSQL Backend** |

---

## Option 1: GitHub Pages (Recommended for Submission)

We have already built and pushed the standalone prototype bundle directly to the `gh-pages` branch on your GitHub repository!

### How to Turn It ON (Takes 30 Seconds):
1. Open your browser and navigate to your repository settings:
   👉 **[https://github.com/Krishna-7772/PRIME/settings/pages](https://github.com/Krishna-7772/PRIME/settings/pages)**
2. In the **"Build and deployment"** section:
   - Under **Source**: Select **"Deploy from a branch"**
   - Under **Branch**: Select **`gh-pages`** and folder **`/ (root)`**
3. Click **"Save"**.
4. Within 30 to 60 seconds, GitHub activates your live working prototype link:
   👉 **`https://krishna-7772.github.io/PRIME/`**

### Why this is the safest prototype link for SIH:
- **Zero Cold Starts**: Does not sleep after 15 minutes of inactivity (unlike free backend servers).
- **Embedded Real Dataset**: Includes all 48 cryptographic findings from the BharatPay FinTech discovery scan, complete code snippets, confidence ratings, Mosca slider simulator, 7-dimension agility radar, real validation benchmark numbers, policy compliance rules, and downloadable CycloneDX 1.7 CBOM.
- **Permanent**: Hosted directly by GitHub under your own username (`Krishna-7772`).

---

## Option 2: 1-Click Vercel Deployment

If you prefer a custom `.vercel.app` domain:
1. Go to **[https://vercel.com/new](https://vercel.com/new)** and sign in with your GitHub account.
2. Select your repository: **`Krishna-7772/PRIME`**.
3. Vercel automatically reads [`vercel.json`](file:///c:/Users/krish/Desktop/Projects/SIH/vercel.json) from the repository root.
4. Click **"Deploy"**.
5. In ~45 seconds, your prototype will be live with a global SSL URL like:
   `https://prime-security.vercel.app`

---

## Option 3: Full Backend on Render.com (FastAPI + SQLite/Postgres)

If you want a live, dedicated cloud backend that can execute scans on new repositories dynamically:
1. Go to **[https://render.com](https://render.com)** and sign in with GitHub.
2. Click **"New +"** $\rightarrow$ **"Blueprint"**.
3. Select your repository: **`Krishna-7772/PRIME`**.
4. Render will automatically read [`render.yaml`](file:///c:/Users/krish/Desktop/Projects/SIH/render.yaml) and configure:
   - Python 3.12 Web Service running `uvicorn app.main:app`
   - Free SSL HTTPS endpoint
5. Click **"Apply"**.
6. Render will provide your public backend API URL (e.g. `https://prime-backend.onrender.com`).
7. You can connect your GitHub Pages or Vercel frontend to this live backend anytime by setting the URL in localStorage or environment variables!

---

## How to Re-Deploy After Future Code Changes
Whenever you make updates to the frontend and want them published to GitHub Pages, simply run:
```powershell
.\deploy_pages.ps1
```
This script automatically compiles the bundle with `npm run build` and updates the `gh-pages` branch on GitHub in 5 seconds!
