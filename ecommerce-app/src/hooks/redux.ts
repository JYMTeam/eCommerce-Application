import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootSate } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

// с помощью этого достаем вещи из state
export const useAppSelector: TypedUseSelectorHook<RootSate> = useSelector;
