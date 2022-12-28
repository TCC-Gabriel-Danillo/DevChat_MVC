jest.mock("@firebase/util", () => {
  const real = jest.requireActual("@firebase/util");
  return {
    ...real,
    uuidv4: () => "ID_MOCKED",
  };
});
