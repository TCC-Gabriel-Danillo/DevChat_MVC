import { useNavigation, NavigationProp } from "@react-navigation/native";

import { NavOpts } from "../types";

export const useMainNavigation = () => useNavigation<NavigationProp<NavOpts>>();
