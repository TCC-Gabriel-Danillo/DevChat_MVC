import { Container, Text } from "@view/components";
import loadingImg from "_assets/loading.png";
import React from "react";
import { Image } from "react-native";

import styles from "./styles";

export function Loading() {
  return (
    <Container style={styles.container}>
      <Image source={loadingImg} style={styles.loadingImg} />
      <Text fontType="h2">Carregando...</Text>
    </Container>
  );
}
