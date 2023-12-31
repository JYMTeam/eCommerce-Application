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
import categoriesReducer from "./slices/categoriesSlice";
import cartReducer from "./slices/cartSlice";
import promocodeReducer from "./slices/promocodeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userLogin", "attributes", "products", "cart"],
};

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  cart: cartReducer,
  userSignup: userSignupReducer,
  userEditMode: userEditModeReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  attributes: attributesReducer,
  notification: notificationReducer,
  categories: categoriesReducer,
  promocodes: promocodeReducer,
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
