// PM2 process manager config — the no-Docker deployment path.
// Usage on the VPS: pm2 start ecosystem.config.js && pm2 save
module.exports = {
  apps: [
    {
      name: "jusor-web",
      script: "npm",
      args: "start",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_memory_restart: "512M",
      autorestart: true,
      watch: false,
    },
  ],
};
