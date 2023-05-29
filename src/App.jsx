import React from "react";
import { ConfigProvider, theme } from "antd";
import { Navigation } from "./routes";
import "./App.scss";

export default function App() {
  // theme={
  //   {
  //     // algorithm: theme.darkAlgorithm,
  //   }
  // }
  return (
    <ConfigProvider>
      <Navigation />
    </ConfigProvider>
  );
}
