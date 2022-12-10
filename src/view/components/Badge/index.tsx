import { Text } from "_/view/components/Text";
import React from "react";
import { View, ViewStyle } from "react-native";

import styles from "./styles";

interface Props {
  text: string | number;
  style?: ViewStyle;
}

export function Badge({ text, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text>{text}</Text>
    </View>
  );
}
