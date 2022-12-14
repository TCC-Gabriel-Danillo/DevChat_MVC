import { act, fireEvent } from "@testing-library/react-native";
import { AuthScreen } from "_/view/screens";
import React from "react";

import { authServiceStub, userMock } from "../../mocks/authService.stub";
import { usersServiceStub } from "../../mocks/usersService.stub";
import { renderWithProviders } from "../../utils/renderWithProvider";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AuthScreen", () => {
  it("Deve autenticar usuário que nunca foi logado ", async () => {
    const { findByText, store } = renderWithProviders(<AuthScreen />);

    const button = await findByText("Entrar com Github");

    await act(() => {
      fireEvent.press(button);
    });

    const { auth } = store.getState();
    const { user } = auth;

    expect(user).toBe(userMock);
    expect(authServiceStub.authenticateGithub).toBeCalled();
  });

  it("Deve criar usuário que não existe ", async () => {
    const { findByText } = renderWithProviders(<AuthScreen />);

    const button = await findByText("Entrar com Github");

    await act(() => {
      fireEvent.press(button);
    });

    expect(usersServiceStub.createUserIfNotExists).toBeCalledWith(userMock);
  });
});
