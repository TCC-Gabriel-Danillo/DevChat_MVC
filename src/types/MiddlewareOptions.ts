import { AuthServiceType } from "_/services/authService/types";
import { ConversationServiceType } from "_/services/conversationService/types";
import { MessageServiceType } from "_/services/messageService/types/MessageServiceType";
import { UsersServiceType } from "_/services/usersService/types";

export type ThunkArgs = {
  conversationService: ConversationServiceType;
  authService: AuthServiceType;
  usersService: UsersServiceType;
  messageService: MessageServiceType;
};

export type MiddlewareOptions = {
  serializableCheck: boolean;
  thunk: {
    extraArgument: ThunkArgs;
  };
};
