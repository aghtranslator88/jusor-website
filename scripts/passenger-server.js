const http = require('http');
const path = require('path');
const fs = require('fs');

// Log unhandled errors to passenger-error.log for cPanel debugging
process.on('uncaughtException', (err) => {
  const logMsg = `[${new Date().toISOString()}] Uncaught Exception: ${err.stack || err}\n`;
  console.error(logMsg);
  try {
    fs.appendFileSync(path.join(__dirname, 'passenger-error.log'), logMsg);
  } catch (e) {}
});

process.on('unhandledRejection', (reason) => {
  const logMsg = `[${new Date().toISOString()}] Unhandled Rejection: ${reason.stack || reason}\n`;
  console.error(logMsg);
  try {
    fs.appendFileSync(path.join(__dirname, 'passenger-error.log'), logMsg);
  } catch (e) {}
});

process.env.NODE_ENV = 'production';
process.chdir(__dirname);

// Load required server config from Next.js build output
let nextConfig = {};
try {
  const requiredServerFiles = require('./.next/required-server-files.json');
  nextConfig = requiredServerFiles.config || {};
  nextConfig.outputFileTracingRoot = __dirname;
  if (nextConfig.turbopack) {
    nextConfig.turbopack.root = __dirname;
  }
} catch (e) {
  console.warn("Could not load required-server-files.json, fallback to empty config");
}

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);

const NextServer = require('next/dist/server/next-server').default;
const nextServer = new NextServer({
  hostname: 'localhost',
  port: 3000,
  dir: __dirname,
  dev: false,
  customServer: false,
  conf: nextConfig,
});

const handler = nextServer.getRequestHandler();

const server = http.createServer((req, res) => {
  handler(req, res);
});

// Phusion Passenger passes UNIX domain socket path or port number in process.env.PORT
const rawPort = process.env.PORT || 3000;
const isUnixSocket =
  typeof rawPort === 'string' &&
  (rawPort.startsWith('/') || rawPort.includes('socket') || rawPort.includes('\\'));

if (isUnixSocket) {
  // MUST NOT pass hostname parameter when listening on a UNIX domain socket path
  server.listen(rawPort, () => {
    console.log(`JUSOR application listening on UNIX socket: ${rawPort}`);
  });
} else {
  const port = parseInt(rawPort, 10) || 3000;
  const hostname = process.env.HOSTNAME || '0.0.0.0';
  server.listen(port, hostname, () => {
    console.log(`JUSOR application listening on http://${hostname}:${port}`);
  });
}
