module.exports = {
  apps: [
    {
      name: 'shining-english',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 4000',
      cwd: '/home/shion/Workspace/NextJS/online-english-learning-platform',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
