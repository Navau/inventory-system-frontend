import React from "react";
import { Spin } from "antd";

import "./Loader.scss";

export function Loader() {
  return (
    <div className="spin-loader">
      <Spin size="large" tip="Cargando">
        <div className="spin-loader__content" />
      </Spin>
    </div>
  );
}
