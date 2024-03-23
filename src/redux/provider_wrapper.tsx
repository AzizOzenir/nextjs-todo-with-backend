"use client";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { aborted } from "util";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};
const ProviderWrapper = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};

export default ProviderWrapper;
