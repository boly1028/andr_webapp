module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  env: {
    API_URL: process.env.API_URL,
    MINTSCAN_TESTNET_BASEURL: process.env.MINTSCAN_TESTNET_BASEURL,
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
