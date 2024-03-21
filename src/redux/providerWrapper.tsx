"use client";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

type Props = {
    children: React.ReactNode;
  };
const ProviderWrapper = ({children}: Props) => {
  return <Provider store={store}>{children} </Provider>;
};

export default ProviderWrapper;
