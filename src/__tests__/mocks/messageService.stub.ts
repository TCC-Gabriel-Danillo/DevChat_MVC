import { VoidCallback } from "_/repositories/RealtimeDatabaseRepository/types";
import { MessageServiceType } from "_/services/messageService/types/MessageServiceType";
import { Message } from "_/types";

import { recivedMessageMock } from "./message.mock";

export const messageServiceStub = {
  setCollectionMessageDB: jest.fn(),
  setCollectionUserDB: jest.fn(),
  setCollectionMessageDBRealTime: jest.fn(),
  sendMessage: jest.fn(),
  listenMessages: jest.fn((cb: VoidCallback<Message>) => {
    cb([recivedMessageMock]);
  }),
  updateMessage: jest.fn(),
  unlistenMessages: jest.fn(),
} as MessageServiceType;
