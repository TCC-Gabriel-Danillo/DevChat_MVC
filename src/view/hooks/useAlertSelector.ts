import { useAppSelector } from "./useAppSelector";

export const useAlertSelector = () => useAppSelector((state) => state.alert);
