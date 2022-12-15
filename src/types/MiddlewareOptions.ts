import { UserService, AuthService, ConversationService } from "_/services";

export type ThunkArgs = {
  conversationService: ConversationService;
  authService: AuthService;
  userService: UserService;
};

export type MiddlewareOptions = {
  thunk: {
    extraArgument: ThunkArgs;
  };
};
