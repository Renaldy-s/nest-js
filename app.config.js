module.exports = {
  apps: [
    {
      name: 'ts-bootstrap',
      script: './build/server.js',
      instances: '2',
      exec_mode: 'cluster',
      autorestart: true,
      watch: ['./build/*'],
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs'],
      exp_backoff_restart_delay: 1000,
      max_memory_restart: '200M',
      log_file: './logs/app.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      combine_logs: true,
      env_development: {
        SERVICE_NAME: 'ts-messaging-api',
        NODE_ENV: 'development',
        NODE_PORT: 3000
      },
      env_production: {
        SERVICE_NAME: 'ts-messaging-api',
        NODE_ENV: 'production',
        NODE_PORT: 3000
      }
    }
  ]
};
