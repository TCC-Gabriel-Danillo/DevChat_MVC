module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@reducer": "./reducer",
            "@store": "./store",
            "@view": "./view",
            _assets: "./assets",
          },
        },
      ],
    ],
  };
};
