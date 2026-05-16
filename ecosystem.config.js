require('dotenv').config({ path: '/var/www/html/shining-english/.env' })

const workers = Number.parseInt(process.env.PM2_WORKERS || '1', 10)

module.exports = {
  apps: [
    {
      name: 'shining-english',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 4000',
      cwd: '/var/www/html/shining-english',

      // Cluster mode
      exec_mode: 'cluster',
      instances: Number.isFinite(workers) && workers > 0 ? workers : 1,

      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}