import React, { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { Navigation } from "./routes";
import "./App.scss";

export default function App() {
  const [themeDark, setThemeDark] = useState(false);
  return (
    <ConfigProvider
      theme={{
        algorithm: themeDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Navigation themeDark={themeDark} setThemeDark={setThemeDark} />
    </ConfigProvider>
  );
}
