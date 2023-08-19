import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./slices/userLoginSlice";
import userSignupReducer from "./slices/userSignupSlice";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
});
export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

//оперделяем типы
export type RootSate = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
