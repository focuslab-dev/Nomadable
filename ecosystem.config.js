module.exports = {
  apps: [
    {
      name: "nomadable",
      script: "npm start",
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};
