# ECDAT: Zero-Cost Cloud Hosting & Deployment Guide
**Smart India Hackathon 2026 | Problem Statement SIH26164 (NTRO)**

This guide provides exact, tested steps to host ECDAT publicly on the **best 100% free cloud services**.

---

## Architecture Summary: Why ECDAT Hosts Cheaply & Easily

We engineered ECDAT so that in production, **FastAPI automatically serves the pre-compiled React Single Page Application (SPA) from the root URL `/`**:
- Visiting `https://your-domain.com/` loads the complete dark-navy React dashboard.
- Visiting `https://your-domain.com/api/v1/*` executes the discovery REST API.
- Visiting `https://your-domain.com/docs` opens Swagger OpenAPI documentation.

This means you can deploy the **entire full-stack application as a SINGLE free service** without managing separate domains, CORS headers, or multi-tier hosting fees!

---

## Option 1: Render.com (Recommended — 100% Free Forever)

Render provides a generous free tier for Web Services and PostgreSQL. We have included an automated **Render Blueprint (`render.yaml`)**.

### Automated 1-Click Steps:
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: prepare for cloud hosting"
   git remote add origin https://github.com/<your-username>/ecdat.git
   git push -u origin main
   ```
2. **Sign up at [Render.com](https://render.com/)** using your GitHub account.
3. Click the **"New +"** button at top right and select **"Blueprint"**.
4. Connect your `ecdat` GitHub repository.
5. Render will automatically detect `render.yaml` and show:
   - **`ecdat-platform`** (Free Web Service)
   - **`ecdat-postgres`** (Free Managed PostgreSQL Database)
6. Click **"Apply"**.
7. Render will automatically:
   - Provision the PostgreSQL database.
   - Install Node.js dependencies and build the React frontend (`npm run build`).
   - Install Python dependencies and start Uvicorn.
   - Issue a free automated SSL/TLS HTTPS certificate (e.g. `https://ecdat-platform.onrender.com`).
8. **Done!** Open your public URL in any browser.

---

## Option 2: Koyeb (Fast Free Docker Hosting)

Koyeb offers a free Eco tier with fast deployment directly from a Git repository or Docker container.

### Steps:
1. Sign up at [Koyeb.com](https://www.koyeb.com/).
2. Click **"Create App"** and choose **"GitHub"**.
3. Select your `ecdat` repository.
4. Choose **"Dockerfile"** as the build method (Koyeb will use the root `Dockerfile` we created).
5. Set:
   - **Port**: `8000`
   - **Protocol**: `HTTP`
6. Click **"Deploy"**.
7. In ~3 minutes, your live URL will be active at `https://<your-app>.koyeb.app/`.

---

## Option 3: Split Deployment (Vercel Frontend + Render Backend)

If you prefer global edge CDN distribution for the frontend and a dedicated backend:

### Step A: Deploy Backend on Render
1. In Render, select **"New +"** $\rightarrow$ **"Web Service"**.
2. Connect your repo.
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Copy your backend URL (e.g. `https://ecdat-api.onrender.com`).

### Step B: Deploy Frontend on Vercel
1. Sign up at [Vercel.com](https://vercel.com/) and click **"Add New Project"**.
2. Import the `ecdat` repository.
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In `frontend/vercel.json`, ensure the proxy points to your Render backend URL:
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "https://ecdat-api.onrender.com/api/$1" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
5. Click **"Deploy"**. Your frontend is live at `https://ecdat.vercel.app/` with global CDN caching.

---

## Option 4: Hugging Face Spaces (Free 16 GB RAM Docker Container)

Hugging Face Spaces provides 100% free CPU instances with 2 vCPUs and 16 GB RAM.

### Steps:
1. Create a free account at [HuggingFace.co](https://huggingface.co/).
2. Click **"New Space"**.
3. Name your space `ecdat`.
4. License: `MIT` / `Apache 2.0`.
5. Select Space SDK: **"Docker"** $\rightarrow$ **"Blank"**.
6. Push your repo to the Hugging Face Git remote:
   ```bash
   git remote add hf https://huggingface.co/spaces/<your-username>/ecdat
   git push hf main
   ```
7. Hugging Face builds the root `Dockerfile` and presents your application in a public sandbox with zero cold start.

---

## Option 5: Free Self-Hosted VPS (Oracle Cloud Always Free)

Oracle Cloud provides **Always Free** ARM Compute instances with:
- 4 OCPUs (Ampere Altra)
- 24 GB RAM
- 200 GB NVMe Storage
- 10 TB/month outbound bandwidth

### Steps:
1. Launch an Ubuntu 22.04 / 24.04 instance on Oracle Cloud Always Free.
2. Install Docker and Git:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose git
   ```
3. Clone your repository:
   ```bash
   git clone https://github.com/<your-username>/ecdat.git
   cd ecdat
   ```
4. Start with Docker Compose:
   ```bash
   sudo docker-compose up -d
   ```
5. Allow port 80/5173/8000 in your Oracle Cloud Virtual Cloud Network (VCN) Ingress Rules.
6. Access your public IP address.

---

## Quick Comparison of Free Options

| Platform | Tier Cost | Setup Effort | Performance | Best Suited For |
|---|---|---|---|---|
| **Render.com (Blueprint)** | **$0 / month** | **Low (1-Click)** | Excellent | **Hackathon Judges & Public Demo** |
| **Koyeb (Docker)** | **$0 / month** | **Low** | Very Fast | Fast container deployments |
| **Vercel + Render** | **$0 / month** | **Medium** | Global CDN Edge | High-traffic UI with backend |
| **Hugging Face Spaces** | **$0 / month** | **Very Low** | High (16 GB RAM) | Academic & AI demonstration |
| **Oracle Always Free** | **$0 / month** | **Medium** | Dedicated 4-core | Long-term enterprise testbed |

---

## Recommended Choice for SIH26164:
Use **Option 1 (Render.com via `render.yaml`)**. It gives you:
1. A permanent public HTTPS URL (e.g. `https://ecdat-platform.onrender.com`).
2. A real PostgreSQL cloud database.
3. Automatic redeployment whenever you push changes to GitHub.
4. 100% free of charge.
