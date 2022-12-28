import { waitFor } from "@testing-library/react-native";
import { HomeScreen } from "_/view/screens";
import React from "react";

import { conversationMock } from "../mocks/conversation.mock";
import { conversationServiceStub } from "../mocks/conversationService.stub";
import { userAutenticatedMock } from "../mocks/userAutenticated.mock";
import { renderWithProviders } from "../utils/renderWithProvider";

describe("HomeScreen", () => {
  it("Deve renderizar conversas que correspondam com a do usuário autenticado", async () => {
    const { store } = await waitFor(() =>
      renderWithProviders(<HomeScreen />, { preloadedState: { auth: userAutenticatedMock } })
    );

    const { conversations } = store.getState().conversation;

    expect(conversationServiceStub.listenConversationsByUserId).toBeCalled();
    expect(conversations).toMatchObject([conversationMock]);
  });

  it("Deve retirar conversas da página quando desmontada", () => {
    const { unmount } = renderWithProviders(<HomeScreen />, { preloadedState: { auth: userAutenticatedMock } });

    unmount();

    expect(conversationServiceStub.unlistenConversationsByUserId).toBeCalled();
  });
});
