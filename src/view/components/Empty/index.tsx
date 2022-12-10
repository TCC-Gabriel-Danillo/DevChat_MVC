import emptyImg from "_/assets/empty.png";
import React from "react";
import { View, Image } from "react-native";

import { Text } from "../Text";
import styles from "./styles";

interface Props {
  message?: string;
}

export function Empty({ message = "Nada para ver por aqui." }: Props) {
  return (
    <View style={styles.container}>
      <Image source={emptyImg} style={styles.image} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
