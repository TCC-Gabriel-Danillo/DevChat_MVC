import { COLORS, MAIN_SCREENS, TEST_ID, ICONS } from "_/constants";
import { Card, Container, Text } from "_/view/components";
import { useAuthSelector, useMainNavigation } from "_/view/hooks";
import React from "react";
import { FlatList } from "react-native";

import styles from "./styles";

export function TechScreen() {
  const { user } = useAuthSelector();
  const navigation = useMainNavigation();

  const navigateToUsersScreen = (tech: string) => navigation.navigate(MAIN_SCREENS.USERS_SCREEN, { tech });

  return (
    <Container>
      <Text fontType="h2" style={styles.title}>
        Escolha uma de suas tecnologias para iniciar sua conversa:{" "}
      </Text>
      <FlatList
        data={user?.techs}
        renderItem={({ item: tech }) => {
          return (
            <Card
              testID={TEST_ID.TECH_CARD}
              onPress={() => navigateToUsersScreen(tech)}
              key={tech}
              icon={<ICONS.CARRET_RIGHT color={COLORS.GREY} />}
              style={styles.card}>
              <Text style={styles.tech}>{tech}</Text>
            </Card>
          );
        }}
      />
    </Container>
  );
}
