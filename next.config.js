module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  env: {
    API_URL: process.env.API_URL,
  },
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};
