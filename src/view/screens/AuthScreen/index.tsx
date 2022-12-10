import { postHttpsAction } from "_/action/httpsActions";
import chatImg from "_/assets/chat.png";
import { COLORS, GITHUB_URL, ICONS } from "_/constants";
import { Button, Container, Text } from "_/view/components";
import { useAuthPrompt, useHttpsSelector } from "_/view/hooks";
import React from "react";
import { Image } from "react-native";
import { useDispatch } from "react-redux";

import { styles } from "./styles";

export function AuthScreen() {
  const { promptAuth } = useAuthPrompt();
  const { isLoading } = useHttpsSelector();

  const dispatch = useDispatch();
  const signIn = async () => {
    const authCredentials = await promptAuth();
    await postHttpsAction(GITHUB_URL.AUTH_BASE_URL, {
      endpoint: "/access_token",
      data: authCredentials,
      config: {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    })(dispatch);
  };

  return (
    <Container style={styles.container}>
      <Text fontType="h1" fontWeight="bold">
        Bem vindo ao DevChat!
      </Text>
      <Text style={styles.subtitle}>Encontre incríveis desenvolvedores e troque experiências.</Text>
      <Image source={chatImg} style={styles.image} />
      <Button style={styles.loginBtn} onPress={signIn} icon={<ICONS.GIT_HUB size={24} color={COLORS.WHITE} />}>
        Entrar com Github
      </Button>
    </Container>
  );
}
