import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { AuthRoute } from "./auth";

export function Route() {
  return (
    <NavigationContainer>
      <AuthRoute />
    </NavigationContainer>
  );
}
