import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "_/store";

import { ThunkArgs } from "./middlewareOptions";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, ThunkArgs, AnyAction>;
