import { createNewConversation, getUsersByTech } from "_/action";
import { MAIN_SCREENS, TEST_ID } from "_/constants";
import { parseArrayToString } from "_/helpers/parseArrayToString";
import { Conversation, User } from "_/types";
import { Text, Loading, Empty, UserCard, Container } from "_/view/components";
import { useAppDispatch, useAuthSelector, useMainNavigation, useMainRoute, useUsersSelector } from "_/view/hooks";
import { useConversationSelector } from "_/view/hooks/useConversationSelector";
import React, { useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import styles from "./styles";

export function UsersScreen() {
  const dispatch = useAppDispatch();
  const { params } = useMainRoute<MAIN_SCREENS.USERS_SCREEN>();
  const { user: authenticatedUsed } = useAuthSelector();

  useEffect(() => {
    if (authenticatedUsed) dispatch(getUsersByTech(params.tech));
  }, []);

  const { isLoadingUsers, users } = useUsersSelector();
  const { singleConversation: conversation } = useConversationSelector();
  const navigation = useMainNavigation();

  const { conversations } = useConversationSelector();

  const renderUserList = () => {
    return (
      <FlatList
        data={users}
        renderItem={({ item: user }) => {
          return (
            <TouchableOpacity onPress={() => onUserPressed(user)} testID={TEST_ID.USER_CARD}>
              <UserCard
                style={styles.userCard}
                photoUrl={user.photoUrl}
                title={user.username}
                subtile={parseArrayToString(user.techs, {
                  limit: 5,
                  separator: ", ",
                })}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const onUserPressed = async (user: User) => {
    if (!authenticatedUsed) return;

    const conversationExists = checkIfConversationExists(user);
    if (conversationExists) {
      goToMessageScreen(conversationExists, user);
      return;
    }

    const participants = [authenticatedUsed, user];
    dispatch(createNewConversation(participants, params.tech));
    if (conversation) goToMessageScreen(conversation, user);
  };

  const checkIfConversationExists = (user: User) => {
    return conversations?.filter((conversation) => {
      return conversation.tech === params.tech && conversation.users.map((_user) => _user.id).includes(user.id);
    })[0];
  };

  const goToMessageScreen = (conversation: Conversation, participant: User) => {
    navigation.navigate(MAIN_SCREENS.MESSAGE_SCREEN, {
      participant,
      conversation,
    });
  };

  if (isLoadingUsers) return <Loading />;

  return (
    <Container>
      <Text>
        Usuários interessados na tecnologia <Text fontWeight="bold">{params.tech}:</Text>
      </Text>
      {users?.length ? renderUserList() : <Empty message="Não há usuários interessados nessa tecnologia." />}
    </Container>
  );
}
