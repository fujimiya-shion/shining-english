module.exports = {
  apps: [
    {
      name: 'shining-english',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 4000',
      cwd: '/var/www/html/shining-english',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
