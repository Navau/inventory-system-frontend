import React from "react";
import { Button } from "antd";

import "./MyHeaderPage.scss";

export function MyHeaderPage(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;
  return (
    <div className="my-header-page-admin">
      <h2>{title}</h2>
      <div>
        {btnTitle && (
          <Button type="primary" onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && (
          <Button type="primary" onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
}
