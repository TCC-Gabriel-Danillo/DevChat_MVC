import { Button, Container, Text } from "@view/components";
import { COLORS, ICONS } from "@view/constants";
import chatImg from "_assets/chat.png";
import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";

export function AuthScreen() {
  // const { loginWithGithub } = useAuth();
  return (
    <Container style={styles.container}>
      <Text fontType="h1" fontWeight="bold">
        Bem vindo ao DevChat!
      </Text>
      <Text style={styles.subtitle}>Encontre incríveis desenvolvedores e troque experiências.</Text>
      <Image source={chatImg} style={styles.image} />
      <Button style={styles.loginBtn} onPress={() => {}} icon={<ICONS.GIT_HUB size={24} color={COLORS.WHITE} />}>
        Entrar com Github
      </Button>
    </Container>
  );
}
