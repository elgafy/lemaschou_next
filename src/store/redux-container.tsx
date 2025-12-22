"use client";
import React from "react";
import ReduxProvider from "./redux-provider";

type props = {
  children: React.ReactNode;
};

function ReduxContainer({ children }: props) {
  return <ReduxProvider>{children}</ReduxProvider>;
}

export default ReduxContainer;
