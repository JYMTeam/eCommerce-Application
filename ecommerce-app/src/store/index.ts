import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userLoginReducer from "./slices/userLoginSlice";
import userSignupReducer from "./slices/userSignupSlice";
import productsReducer from "./slices/productsSlice";
import filterProductsReducer from "./slices/filterProductsSlice";
import attributesReducer from "./slices/attributesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  filterProducts: filterProductsReducer,
  products: productsReducer,
  attributes: attributesReducer,
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

//оперделяем типы
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
