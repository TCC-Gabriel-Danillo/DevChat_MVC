import { openAlert } from "_/action/alertActions";
import {
  GIT_CLIENT_ID,
  GIT_REVOCATION_ENDPOINT,
  GIT_TOKEN_ENDPOINT,
  GIT_AUTHORIZATION_ENDPOINT,
  APP_SCHEME,
  GIT_CLIENT_SECRET,
} from "_/constants";
import { AuthCredentialType } from "_/types";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { useAppDispatch } from "./useAppDispatch";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: GIT_AUTHORIZATION_ENDPOINT,
  tokenEndpoint: GIT_TOKEN_ENDPOINT,
  revocationEndpoint: GIT_REVOCATION_ENDPOINT,
};

export interface AuthPromptService {
  promptAuth: () => Promise<AuthCredentialType | undefined>;
}

export function useAuthPrompt(): AuthPromptService {
  const [, , promptAsync] = useAuthRequest(
    {
      clientId: GIT_CLIENT_ID,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: APP_SCHEME,
      }),
    },
    discovery
  );

  const dispatch = useAppDispatch();

  const promptAuth = async (): Promise<AuthCredentialType | undefined> => {
    try {
      const promptResponse = await promptAsync();
      if (promptResponse.type !== "success") throw new Error("Algo deu errado ao tentar logar.");
      const { code } = promptResponse.params;
      return {
        client_id: GIT_CLIENT_ID,
        client_secret: GIT_CLIENT_SECRET,
        code,
      };
    } catch {
      dispatch(openAlert("Erro ao logar com o git."));
    }
  };

  return { promptAuth };
}
