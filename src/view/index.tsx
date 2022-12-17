import React from "react";

import { useCustomFonts } from "./hooks";
import { Route } from "./routes";

const Root = () => {
  const isLoaded = useCustomFonts();

  if (!isLoaded) return;
  return <Route />;
};

export default Root;
