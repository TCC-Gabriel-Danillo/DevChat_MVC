import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

import { useAuthSelector } from "../hooks";
import { AppRoute } from "./app";
import { AuthRoute } from "./auth";

export function Route() {
  const { isAuthenticated } = useAuthSelector();

  return <NavigationContainer>{!isAuthenticated ? <AuthRoute /> : <AppRoute />}</NavigationContainer>;
}
