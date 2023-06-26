import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState } from "./store";
import { AnyAction } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
