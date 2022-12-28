import { mapConversationToFirebaseConversation } from "_/helpers/mapConversationToFirebaseConversation";
import { ConversationService } from "_/services";

import { RealtimeDatabaseStub } from "../mocks/RealTimeDatabase.stub";
import { userMock } from "../mocks/authService.stub";
import { conversationMock } from "../mocks/conversation.mock";
import { DatabaseRepositoryStub } from "../mocks/databaseRepository.stub";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ConversationService", () => {
  const conversationDatabase = DatabaseRepositoryStub;
  const userDatabase = DatabaseRepositoryStub;
  const conversationRealtime = RealtimeDatabaseStub;
  const conversationService = new ConversationService(conversationDatabase, userDatabase, conversationRealtime);

  it("Deve criar conversa no banco de dados", () => {
    conversationService.createConversation(conversationMock);
    const expected = mapConversationToFirebaseConversation(conversationMock);
    expect(conversationDatabase.createOrReplace).toBeCalledWith(expected, expected.id);
  });

  it("Deve atualizar conversa no banco de dados", () => {
    conversationService.updateConversationById(conversationMock);
    const expected = mapConversationToFirebaseConversation(conversationMock);
    expect(conversationDatabase.update).toBeCalledWith(expected, expected.id);
  });

  it("Deve apagar conversa no banco de dados", () => {
    conversationService.deleteConversation(conversationMock);
    expect(conversationDatabase.delete).toBeCalledWith(conversationMock.id);
  });

  it("Deve dar watch no banco de dados", () => {
    conversationService.listenConversationsByUserId(userMock.id, jest.fn());
    expect(conversationRealtime.watch).toBeCalled();
  });

  it("Deve dar unwatch no banco de dados", () => {
    conversationService.unlistenConversationsByUserId();
    expect(conversationRealtime.unwatch).toBeCalled();
  });
});
