import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS, MAIN_SCREENS } from "_/constants";
import { Conversation } from "_/types";
import { LogoutButton } from "_/view/components";
import { HomeScreen } from "_/view/screens/HomeScreen";
import { MessagesScreen } from "_/view/screens/MessagesScreen";
import { TechScreen } from "_/view/screens/TechsScreen";
import { UsersScreen } from "_/view/screens/UsersScreen";
import React from "react";

export const mainOptions = {
  headerStyle: {
    backgroundColor: COLORS.PRIMARY,
  },
  headerTintColor: COLORS.WHITE,
  headerRight: LogoutButton,
};

const Stack = createNativeStackNavigator();

export function AppRoute() {
  return (
    <Stack.Navigator screenOptions={mainOptions}>
      <Stack.Screen name={MAIN_SCREENS.HOME_SCREEN} options={{ title: "Conversas" }} component={HomeScreen} />
      <Stack.Screen name={MAIN_SCREENS.USERS_SCREEN} options={{ title: "Usuários" }} component={UsersScreen} />
      <Stack.Screen name={MAIN_SCREENS.TECH_SCREEN} component={TechScreen} options={{ title: "Suas tecnologias" }} />
      <Stack.Screen
        name={MAIN_SCREENS.MESSAGE_SCREEN}
        options={({ route }) => ({
          title: route?.params?.participant?.username,
        })}>
        {({ route }) => {
          const conversation = route?.params?.conversation as Conversation;
          return <MessagesScreen conversation={conversation} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
