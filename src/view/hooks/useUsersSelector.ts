import { useAppSelector } from "./useAppSelector";

export const useUsersSelector = () => useAppSelector((state) => state.users);
