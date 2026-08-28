import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const standaloneDir = path.join(rootDir, ".next", "standalone");
const publicSource = path.join(rootDir, "public");
const publicTarget = path.join(standaloneDir, "public");

const staticSource = path.join(rootDir, ".next", "static");
const staticTarget = path.join(standaloneDir, ".next", "static");

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log("Preparing HostGator deployment bundle...");

if (!fs.existsSync(standaloneDir)) {
  console.error("Error: .next/standalone does not exist. Run 'npm run build' first.");
  process.exit(1);
}

// 1. Copy public directory into standalone
console.log("Copying public/ to .next/standalone/public/...");
copyRecursiveSync(publicSource, publicTarget);

// 2. Copy static assets into standalone/.next/static
console.log("Copying .next/static/ to .next/standalone/.next/static/...");
copyRecursiveSync(staticSource, staticTarget);

// 3. Install Phusion Passenger socket-safe entry wrapper for app.js and server.js
console.log("Installing Phusion Passenger UNIX socket-safe entry wrappers (app.js & server.js)...");
const passengerServerSource = path.join(rootDir, "scripts", "passenger-server.js");
const passengerServerContent = fs.readFileSync(passengerServerSource, "utf8");

fs.writeFileSync(path.join(standaloneDir, "server.js"), passengerServerContent, "utf8");
fs.writeFileSync(path.join(standaloneDir, "app.js"), passengerServerContent, "utf8");

console.log("\nSuccess! The .next/standalone directory is fully prepared for HostGator cPanel.");
