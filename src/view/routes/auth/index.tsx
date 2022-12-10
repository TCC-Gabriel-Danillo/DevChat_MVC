import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "_/view/screens";
import React from "react";

const Stack = createNativeStackNavigator();

export function AuthRoute() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Navigation" component={AuthScreen} />
    </Stack.Navigator>
  );
}
