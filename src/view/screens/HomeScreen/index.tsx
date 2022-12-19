import { listenConversation, unlistenConversations } from "_/action";
import { COLORS, ICONS, MAIN_SCREENS, TEST_ID } from "_/constants";
import { Conversation, User } from "_/types";
import { Container, Text, Loading, AddButton, UserCard, Badge, Empty } from "_/view/components";
import { useAppDispatch, useAuthSelector } from "_/view/hooks";
import { useConversationSelector } from "_/view/hooks/useConversationSelector";
import { useMainNavigation } from "_/view/hooks/useMainNavigation";
import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

export function HomeScreen() {
  const { user: authUser } = useAuthSelector();
  const dispatch = useAppDispatch();
  const navigation = useMainNavigation();

  useEffect(() => {
    dispatch(listenConversation());
    return () => dispatch(unlistenConversations());
  }, []);

  const { conversations, isLoadingConversations } = useConversationSelector();

  if (isLoadingConversations) return <Loading />;

  const goToTechScreen = () => {
    navigation.navigate(MAIN_SCREENS.TECH_SCREEN);
  };

  const goToMessageScreen = (conversation: Conversation, participant: User) => {
    navigation.navigate(MAIN_SCREENS.MESSAGE_SCREEN, {
      participant,
      conversation,
    });
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <Empty />
      </View>
    );
  };

  const renderConversationList = () => {
    return (
      <FlatList
        data={conversations}
        renderItem={({ item: conversation }) => {
          const participant = conversation.users.filter((cUser) => cUser.id !== authUser?.id)[0];
          const shouldShowBadge = conversation.unreadNumber > 0 && conversation.lastSenderId !== authUser?.id;

          return (
            <TouchableOpacity
              onPress={() => goToMessageScreen(conversation, participant)}
              style={styles.userCard}
              testID={TEST_ID.USER_CARD}>
              <UserCard
                photoUrl={participant.photoUrl}
                title={participant.username}
                subtile={`Tema: ${conversation.tech}`}
              />

              {shouldShowBadge && <Badge text={conversation.unreadNumber} style={styles.unreadNumber} />}
              <ICONS.CARRET_RIGHT color={COLORS.GREY} />
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <Container testID={TEST_ID.HOME}>
      <Text fontType="h2">Suas conversas iniciadas para cada tecnologia de interesse:</Text>
      {conversations?.length ? renderConversationList() : renderEmptyComponent()}
      <AddButton testID={TEST_ID.ADD_BUTTON} style={styles.addButton} onPress={goToTechScreen} />
    </Container>
  );
}
