import { useAppSelector } from "./useAppSelector";

export const useAuthSelector = () => useAppSelector((state) => state.auth);
