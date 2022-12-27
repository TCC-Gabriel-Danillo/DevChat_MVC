import { listenMessages, markAsRead, sendMessage, unlistenMessages } from "_/action/messageActions";
import { parseDate } from "_/helpers/parseDate";
import { Conversation, Message } from "_/types";
import { MessageBallon, Loading, Container, MessageInput } from "_/view/components";
import { useAppDispatch, useAuthSelector } from "_/view/hooks";
import { useMessageSelector } from "_/view/hooks/useMessageSelector";
import React, { useRef, useCallback, useEffect } from "react";
import { FlatList, ViewToken } from "react-native";

import styles from "./style";

type MessageScreenTypes = {
  conversation: Conversation;
};

export function MessagesScreen({ conversation }: MessageScreenTypes) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listenMessages(conversation));
    return () => {
      dispatch(unlistenMessages());
    };
  }, []);

  const { messages, isLoadingMessages } = useMessageSelector();
  const flatListRef = useRef<FlatList>(null);
  const { user: authUser } = useAuthSelector();

  const handleViawbleChange = useCallback(async ({ changed }: { changed: ViewToken[] }) => {
    const messagesToMarkAsRead = changed.filter((item) => item.isViewable).map((item: { item: Message }) => item.item);
    await Promise.resolve([messagesToMarkAsRead.map((message) => dispatch(markAsRead(message)))]);
  }, []);

  const _sendMessage = (message: string) => {
    dispatch(sendMessage(message));
  };

  if (isLoadingMessages) return <Loading />;

  return (
    <Container style={styles.container}>
      <FlatList<Message>
        inverted
        ref={flatListRef}
        style={styles.list}
        onViewableItemsChanged={handleViawbleChange}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        data={messages}
        contentContainerStyle={{ flexDirection: "column-reverse" }}
        renderItem={({ item: message }) => {
          return (
            <MessageBallon
              formatedDate={parseDate(message.createdAt)}
              isRead={message.read}
              isSender={message.sender.id === authUser?.id}
              message={message.message}
            />
          );
        }}
      />
      <MessageInput onSendMessage={_sendMessage} />
    </Container>
  );
}
