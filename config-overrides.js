module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    url: require.resolve("url/"),
    crypto: require.resolve("crypto-browserify"),
  };

  config.resolve.extensions.push(".ts", ".tsx"); // Ensure TypeScript files are handled

  return config;
};
