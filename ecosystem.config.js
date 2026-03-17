// PM2: второе мини-приложение ВКР (vkr-mini-app)
// На сервере: /var/www/vkr-mini-app, порт 3001
module.exports = {
  apps: [
    {
      name: 'vkr-backend',
      script: './backend/server.js',
      cwd: '/var/www/vkr-mini-app',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'uploads', 'frontend', '.git'],
    },
  ],
};
