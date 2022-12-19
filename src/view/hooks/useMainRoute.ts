import { useRoute, RouteProp } from "@react-navigation/native";

import { NavOpts } from "../types";

export const useMainRoute = <T extends keyof NavOpts>() => useRoute<RouteProp<NavOpts, T>>();
