import { Message } from "_/types";

import { userMock } from "./authService.stub";
import { mockedParticipant } from "./usersService.stub";

export const sendedMessageMock: Message = {
  createdAt: new Date(),
  message: "MOCKED_MESSAGE",
  read: false,
  sender: userMock,
  id: "ID_MOCKED",
};

export const recivedMessageMock: Message = {
  createdAt: new Date(),
  message: "MOCKED_MESSAGE",
  read: false,
  sender: mockedParticipant,
  id: "ID_MOCKED",
};
