import { useAppSelector } from "./useAppSelector";

export const useHttpsSelector = () => useAppSelector((state) => state.https);
