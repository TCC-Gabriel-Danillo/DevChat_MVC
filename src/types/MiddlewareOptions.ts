import { AuthService } from "_/services/authService";

export type ThunkArgs = {
  authService: AuthService;
};

export type MiddlewareOptions = {
  thunk: {
    extraArgument: ThunkArgs;
  };
};
