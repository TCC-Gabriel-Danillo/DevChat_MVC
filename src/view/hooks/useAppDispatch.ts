import { AppDispatch } from "_/store/storeConfig";
import { useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
