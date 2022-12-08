const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const config = getDefaultConfig(__dirname);

const storePath = __dirname + "/store";
const reducerPath = __dirname + "/reducer";
const viewPath = __dirname + "/view";

const extraNodeModules = {
  store: path.resolve(storePath),
  view: path.resolve(viewPath),
  reducer: path.resolve(reducerPath),
};

config.watchFolders = Object.values(extraNodeModules);

config.resolver.extraNodeModules = new Proxy(extraNodeModules, {
  get: (target, name) => (name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`)),
});

config.resolver.assetExts.push("cjs");

module.exports = config;
