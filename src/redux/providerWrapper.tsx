"use client";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  
};
const ProviderWrapper = ({ children }: Props) => {
  const { data: session } = useSession();
  return (
    <Provider store={store}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </Provider>
  );
};

export default ProviderWrapper;

/* create a header that has signin out conditional rendering, also implement redux */