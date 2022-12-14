import { Text } from "_/view/components/Text";
import { UiType } from "_/view/types";
import React from "react";
import { TouchableOpacity, ViewStyle, TouchableOpacityProps } from "react-native";

import styles from "./styles";

interface Props extends TouchableOpacityProps {
  style?: ViewStyle;
  type?: UiType;
}

export function AddButton({ style, type = "primary", ...rest }: Props) {
  const styleByType = styles[type];

  return (
    <TouchableOpacity style={[styles.button, styleByType, style]} {...rest}>
      <Text style={styleByType}>+</Text>
    </TouchableOpacity>
  );
}
