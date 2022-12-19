import { authenticateGithub, createOrUpdateUser } from "_/action";
import chatImg from "_/assets/chat.png";
import { COLORS, ICONS } from "_/constants";
import { Button, Container, Text } from "_/view/components";
import { useAuthPrompt, useAuthSelector } from "_/view/hooks";
import { useAppDispatch } from "_/view/hooks/useAppDispatch";
import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";

export function AuthScreen() {
  const { promptAuth } = useAuthPrompt();
  const { user } = useAuthSelector();

  const dispatch = useAppDispatch();

  async function signIn() {
    const authCredentials = await promptAuth();
    if (authCredentials) {
      dispatch(authenticateGithub(authCredentials));
    }
    if (user) {
      dispatch(createOrUpdateUser(user));
    }
  }

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
