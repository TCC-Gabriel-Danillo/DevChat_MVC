import { act, fireEvent } from "@testing-library/react-native";
import { TEST_ID } from "_/constants";
import { UsersScreen } from "_/view/screens/UsersScreen";
import React from "react";

import { conversationMock } from "../mocks/conversationMock";
import { createConversationMock } from "../mocks/conversationServiceStub";
import { userAutenticatedMock } from "../mocks/userAutenticatedMock";
import { renderWithProviders } from "../utils/renderWithProvider";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UsersScreen", () => {
  it("Deve renderizar usuários quando estiver logado", async () => {
    const { findByTestId } = renderWithProviders(<UsersScreen />, {
      preloadedState: {
        auth: userAutenticatedMock,
      },
    });

    const userCard = await findByTestId(TEST_ID.USER_CARD);

    expect(userCard).toBeDefined();
  });

  it("Deve criar conversa caso ainda não exista", async () => {
    const { findByTestId } = renderWithProviders(<UsersScreen />, {
      preloadedState: {
        auth: userAutenticatedMock,
      },
    });

    const userCard = await findByTestId(TEST_ID.USER_CARD);

    await act(() => {
      fireEvent.press(userCard);
    });

    expect(createConversationMock).toBeCalledWith(conversationMock);
  });
});
