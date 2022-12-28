import { markAsRead, sendMessage } from "_/action/messageActions";
import { MessagesScreen } from "_/view/screens/MessagesScreen";
import React from "react";

import { conversationMock } from "../../mocks/conversation.mock";
import { recivedMessageMock, sendedMessageMock } from "../../mocks/message.mock";
import { messageServiceStub } from "../../mocks/messageService.stub";
import { userAutenticatedMock } from "../../mocks/userAutenticated.mock";
import { renderWithProviders } from "../../utils/renderWithProvider";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MessagesScreen", () => {
  it("Deve renderizar mensagens assim que abrir página", async () => {
    renderWithProviders(<MessagesScreen conversation={conversationMock} />, {
      preloadedState: {
        auth: userAutenticatedMock,
      },
    });

    expect(messageServiceStub.listenMessages).toBeCalled();
  });

  it("Deve apagar mensagens assim que fechar página", async () => {
    const { unmount } = renderWithProviders(<MessagesScreen conversation={conversationMock} />, {
      preloadedState: {
        auth: userAutenticatedMock,
      },
    });

    unmount();

    expect(messageServiceStub.unlistenMessages).toBeCalled();
  });

  it("Deve marcar mensagem como lida", async () => {
    const { store } = renderWithProviders(<MessagesScreen conversation={conversationMock} />, {
      preloadedState: {
        auth: userAutenticatedMock,
        message: {
          isLoadingMessages: false,
          messages: [recivedMessageMock],
        },
      },
    });

    store.dispatch(markAsRead(recivedMessageMock));

    expect(messageServiceStub.updateMessage).toBeCalledWith({ ...recivedMessageMock, read: true });
  });

  it("Deve enviar mensagem", async () => {
    const { store } = renderWithProviders(<MessagesScreen conversation={conversationMock} />, {
      preloadedState: {
        auth: userAutenticatedMock,
        message: {
          isLoadingMessages: false,
          messages: [recivedMessageMock],
        },
      },
    });
    const message = "MOCKED_MESSAGE";

    store.dispatch(sendMessage(message));

    expect(messageServiceStub.sendMessage).toBeCalled();
    expect(messageServiceStub.sendMessage).toBeCalledWith(sendedMessageMock);
  });
});
