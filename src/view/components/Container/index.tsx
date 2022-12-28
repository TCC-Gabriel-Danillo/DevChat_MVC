import React, { ReactNode } from "react";
import { View, ViewProps, ViewStyle } from "react-native";

import { styles } from "./styles";

interface Props extends ViewProps {
  children: ReactNode;
  style?: ViewStyle;
}
export const Container: React.FC<Props> = ({ children, style, ...rest }) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};
