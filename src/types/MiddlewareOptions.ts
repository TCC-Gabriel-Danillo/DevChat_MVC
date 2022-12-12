import { UserService, AuthService } from "_/services";

export type ThunkArgs = {
  authService: AuthService;
  userService: UserService;
};

export type MiddlewareOptions = {
  thunk: {
    extraArgument: ThunkArgs;
  };
};
