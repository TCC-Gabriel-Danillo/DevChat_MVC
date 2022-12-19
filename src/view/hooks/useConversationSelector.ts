import { useAppSelector } from "./useAppSelector";

export const useConversationSelector = () => useAppSelector((state) => state.conversation);
