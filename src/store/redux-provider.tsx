"use client";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { persister, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

persistStore(store);
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>{children}</PersistGate>
    </Provider>
  );
}
