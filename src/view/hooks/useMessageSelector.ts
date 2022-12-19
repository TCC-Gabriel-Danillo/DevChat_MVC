import { useAppSelector } from "./useAppSelector";

export const useMessageSelector = () => useAppSelector((state) => state.message);
