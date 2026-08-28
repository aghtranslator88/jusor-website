# HostGator Deployment Guide for JUSOR Website

This guide walks you through deploying your Next.js website on **HostGator Shared Hosting (cPanel)** and resolving common deployment issues such as **503 Service Unavailable**.

---

## Option A: Deploying via cPanel "Setup Node.js App" (Recommended)

### 1. Build and Package Locally
Run the build and packaging commands:
```bash
npm run build
npm run package:hostgator
```
This automatically builds the project and prepares `.next/standalone` with static assets and Phusion Passenger UNIX socket wrappers (`app.js` and `server.js`).

### 2. Upload to HostGator
1. Open cPanel **File Manager**.
2. Go to your home directory (`/home/yourusername/`).
3. Create a folder named `jusor-app` (or zip the **contents** inside `.next/standalone` and upload into `/home/yourusername/jusor-app`).
4. Ensure `app.js`, `server.js`, and `package.json` are placed directly inside `/home/yourusername/jusor-app/`.

### 3. Configure Node.js in cPanel
1. In cPanel, open **Setup Node.js App**.
2. Click **Create Application**.
3. Configure the following:
   - **Node.js version**: Select **18.x** or **20.x** (Node 14/16 will crash and cause 503 errors).
   - **Application mode**: `Production`.
   - **Application root**: `jusor-app`
   - **Application URL**: Select your domain.
   - **Application startup file**: `app.js` (or `server.js`).
4. Click **Create** and then click **Restart Application**.

---

## Troubleshooting 503 Service Unavailable Errors

If you see `503 Error. Service Unavailable.` when loading your site on HostGator:

1. **Node.js Version**: In cPanel > Setup Node.js App, ensure the Node version is set to **18.x** or **20.x**. Next.js 16 requires Node 18+.
2. **Check Error Log**: In cPanel File Manager, navigate to `/home/yourusername/jusor-app/passenger-error.log` to view exact startup error tracebacks.
3. **Application Root File Location**: Verify `app.js` is directly at the root of `jusor-app` (i.e. `/home/yourusername/jusor-app/app.js`), not nested inside `/home/yourusername/jusor-app/standalone/...`.
4. **UNIX Socket Compatibility**: Make sure you ran `npm run package:hostgator` before uploading so that `app.js` handles Phusion Passenger's socket environment variable correctly.

---

## Option B: Deploying as a Static Export (Zero-Downtime Fallback)

Use this method if HostGator shared hosting limits Node.js sockets or memory.

1. Set `output: "export"` in `next.config.ts`.
2. Run `npm run build`.
3. Zip the **contents** of the `out/` folder into `static-site.zip`.
4. Upload and extract directly into `public_html/` via cPanel File Manager.

---

## Database Connection Note (PostgreSQL)

HostGator shared servers run MySQL locally. For PostgreSQL (`prisma/schema.prisma`), use a managed cloud Postgres database:
- **Supabase** ([supabase.com](https://supabase.com))
- **Neon** ([neon.tech](https://neon.tech))

Set your cloud connection string as `DATABASE_URL` in cPanel environment variables.
