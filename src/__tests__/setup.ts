jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("../hooks/useAuthPrompt", () => ({
  useAuthPrompt: () => ({
    promptAuth: async () =>
      Promise.resolve({
        code: "1234",
        client_id: "client_id",
        client_secret: "client_secret",
      }),
  }),
}));
