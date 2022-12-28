import { act, fireEvent, waitFor } from "@testing-library/react-native";
import { TEST_ID } from "_/constants";
import { UsersScreen } from "_/view/screens/UsersScreen";
import React from "react";

import { conversationMock } from "../mocks/conversation.mock";
import { conversationServiceStub } from "../mocks/conversationService.stub";
import { userAutenticatedMock } from "../mocks/userAutenticated.mock";
import { mockedParticipant, usersServiceStub } from "../mocks/usersService.stub";
import { renderWithProviders } from "../utils/renderWithProvider";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UsersScreen", () => {
  it("Deve renderizar usuários quando estiver logado", async () => {
    const { store } = await waitFor(async () =>
      renderWithProviders(<UsersScreen />, {
        preloadedState: {
          auth: userAutenticatedMock,
        },
      })
    );

    const { users } = store.getState().users;

    expect(users).toMatchObject([mockedParticipant]);
    expect(usersServiceStub.listUsersByTech).toBeCalled();
    expect(usersServiceStub.listUsersByTech).toBeCalledWith("any_tech");
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

    expect(conversationServiceStub.createConversation).toBeCalledWith(conversationMock);
  });
});
