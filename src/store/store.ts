import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { AdPathsReducer } from "./PathsSlice";
import { AssetsSlice } from "./AssetsSlice";

const isClient = typeof window !== "undefined";
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null as string | null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};
const storage = isClient ? createWebStorage("local") : createNoopStorage();

const PersistConfig = {
  key: "root",
  storage,
  whitelist: ["AdPathsState"],
};

const persistedReducer = persistReducer(PersistConfig, AdPathsReducer);
const rootReducer = combineReducers({
  paths: persistedReducer,
  assets: AssetsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persister = persistStore(store);
export function getReduxState() {
  return store.getState();
}

export type App_state = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<App_state> = useSelector;
export { useAppDispatch };
