module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|__tests__|__mocks__)",
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    ".mock.ts",
    "__tests__/utils",
    ".stub.ts",
    "types",
    "repositories",
    "view/components",
    "constants",
  ],
  testMatch: ["**/*.(spec|test).(ts|tsx)"],
  setupFiles: ["./__mocks__/setup.ts"],
};
