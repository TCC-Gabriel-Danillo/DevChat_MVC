import { waitFor } from "@testing-library/react-native";
import React from "react";
import { HomeScreen } from "_/view/screens";
import { listenConversationsByUserIdMock } from "../mocks/conversationServiceStub";
import { userAutenticatedMock } from "../mocks/userAutenticatedMock";
import { renderWithProviders } from "../utils/renderWithProvider";

describe("HomeScreen", () => {
  it("Deve renderizar conversas que correspondam com a do usuário autenticado", async () => {
    await waitFor(() => renderWithProviders(<HomeScreen />, { preloadedState: { auth: userAutenticatedMock } }));

    expect(listenConversationsByUserIdMock).toBeCalled();
    expect(listenConversationsByUserIdMock).toBeCalledWith(userAutenticatedMock.user.id);
  });

  it("Deve procurar renderizar conversas que correspondam com a do usuário autenticado", () => {
    renderWithProviders(<HomeScreen />, { preloadedState: { auth: userAutenticatedMock } });

    expect(listenConversationsByUserIdMock).toBeCalled();
    expect(listenConversationsByUserIdMock).toBeCalledWith(userAutenticatedMock.user.id);
  });
});
