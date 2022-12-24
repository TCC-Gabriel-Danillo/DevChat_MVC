import type { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react-native";
import { render } from "@testing-library/react-native";
import { setupStore } from "_/store/storeConfig";
import type { AppStore, RootState } from "_/store/storeConfig";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { AuthServiceStub } from "../mocks/authServiceStub";
import { ConversationServiceStub } from "../mocks/conversationServiceStub";
import { MessageServiceStub } from "../mocks/messageServiceStub";
import { UsersServiceStub } from "../mocks/usersServiceStub";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: JSX.Element,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const store = setupStore(
    {
      authService: new AuthServiceStub(),
      usersService: new UsersServiceStub(),
      conversationService: new ConversationServiceStub(),
      messageService: new MessageServiceStub(),
    },
    preloadedState
  );

  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
