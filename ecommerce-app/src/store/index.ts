import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userLoginReducer from "./slices/userLoginSlice";
import userSignupReducer from "./slices/userSignupSlice";
import productsReducer from "./slices/productsSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import notificationReducer from "./slices/notificationSlice";
import attributesReducer from "./slices/attributesSlice";
import userEditModeReducer from "./slices/userEditModeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userLogin", "attributes", "products"],
};

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userEditMode: userEditModeReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  attributes: attributesReducer,
  notification: notificationReducer,
});
export const persistedReducer = persistReducer(persistConfig, rootReducer);

export function setupStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
