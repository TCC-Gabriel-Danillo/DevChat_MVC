import { UsersService, AuthService, ConversationService } from "_/services";
import { MessageService } from "_/services/messageService";

export type ThunkArgs = {
  conversationService: ConversationService;
  authService: AuthService;
  usersService: UsersService;
  messageService: MessageService;
};

export type MiddlewareOptions = {
  serializableCheck: boolean;
  thunk: {
    extraArgument: ThunkArgs;
  };
};
