import { useAppSelector } from "./useAppSelector";

export const useUserSelector = () => useAppSelector((state) => state.user);
