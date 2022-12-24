jest.mock("_/view/hooks/useMainNavigation", () => ({
  useMainNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("_/view/hooks/useMainRoute", () => ({
  useMainRoute: () => ({
    params: {
      tech: "any_tech",
    },
  }),
}));
