import { mapMessageToFirebaseMessage } from "_/helpers/firebaseMessageHelper";
import { MessageService } from "_/services/messageService";

import { DatabaseRepositoryStub } from "../mocks/databaseRepository.stub";
import { sendedMessageMock } from "../mocks/message.mock";
import { RealtimeDatabaseStub } from "../mocks/realTimeDatabase.stub";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MessageService", () => {
  const messageDatabase = DatabaseRepositoryStub;
  const userDatabase = DatabaseRepositoryStub;
  const messageRealTimeDatabase = RealtimeDatabaseStub;
  const messageService = new MessageService(messageDatabase, messageRealTimeDatabase, userDatabase);

  it("Deve criar mensagem no banco", () => {
    messageService.sendMessage(sendedMessageMock);
    const expected = mapMessageToFirebaseMessage(sendedMessageMock);
    expect(messageDatabase.createOrReplace).toBeCalledWith(expected, sendedMessageMock.id);
  });

  it("Deve atualizar mensagem no banco", () => {
    messageService.updateMessage(sendedMessageMock);
    const expected = mapMessageToFirebaseMessage(sendedMessageMock);
    expect(messageDatabase.update).toBeCalledWith(expected, sendedMessageMock.id);
  });

  it("Deve chamar watch no banco de dados", () => {
    messageService.listenMessages(jest.fn());
    expect(messageRealTimeDatabase.watch).toBeCalled();
  });

  it("Deve chamar unwatch no banco de dados", () => {
    messageService.unlistenMessages();
    expect(messageRealTimeDatabase.unwatch).toBeCalled();
  });
});
