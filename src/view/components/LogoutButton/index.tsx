import { ICONS, TEST_ID, COLORS } from "_/constants";
// import { useAuth } from "@view/hooks";
import React from "react";

import { IconButton } from "../IconButton";

export function LogoutButton() {
  // const { logout } = useAuth();

  const logout = () => {};

  return <IconButton testID={TEST_ID.LOGOUT} onPress={logout} icon={<ICONS.LOGOUT size={24} color={COLORS.WHITE} />} />;
}
