import { closeAlert } from "_/action/alertActions";
import React from "react";

import { Modal, Text } from "./components";
import { useAlertSelector, useAppDispatch, useCustomFonts } from "./hooks";
import { Route } from "./routes";

const Root = () => {
  const isLoaded = useCustomFonts();
  const dispatch = useAppDispatch();
  const { isOpen, message } = useAlertSelector();

  if (!isLoaded) return <></>;

  const closeModal = () => {
    dispatch(closeAlert());
  };

  return (
    <>
      <Modal isOpen={isOpen} onPressOutside={closeModal} onCloseRequest={closeModal}>
        <Text>{message}</Text>
      </Modal>
      <Route />
    </>
  );
};

export default Root;
