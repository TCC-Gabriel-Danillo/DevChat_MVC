import { logoutAction } from "_/action";
import { ICONS, TEST_ID, COLORS } from "_/constants";
import { useAppDispatch } from "_/view/hooks";
import React from "react";

import { IconButton } from "../IconButton";

export function LogoutButton() {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return <IconButton testID={TEST_ID.LOGOUT} onPress={logout} icon={<ICONS.LOGOUT size={24} color={COLORS.WHITE} />} />;
}
