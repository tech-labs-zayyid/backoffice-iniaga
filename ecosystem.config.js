module.exports = {
  apps: [
    {
      name: "iniaga-backoffice",
      script: "node_modules/.bin/next",
      args: "start",
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

