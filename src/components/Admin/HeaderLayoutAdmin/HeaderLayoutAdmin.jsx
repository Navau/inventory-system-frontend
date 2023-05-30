import React from "react";
import { Button, Space, Typography } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  BulbFilled,
  BulbOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./HeaderLayoutAdmin.scss";

export function HeaderLayoutAdmin(props) {
  const { collapsed, setCollapsed, themeDark, setThemeDark } = props;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <Space wrap className="header-layout-admin">
      <Button
        className="button-collapsed-menu"
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
      <Space className="header-layout-admin__options">
        <Button
          className="button-change-theme"
          icon={
            themeDark ? (
              <BulbOutlined className="bulb-off" />
            ) : (
              <BulbFilled className="bulb-on" />
            )
          }
          onClick={() => setThemeDark((prev) => !prev)}
        >
          {!isTabletOrMobile &&
            `Cambiar a tema ${themeDark ? "claro" : "oscuro"}`}
        </Button>
        <Button
          className="my-account-button"
          icon={<UserOutlined />}
          onClick={() => console.log("INGRESANDO A CUENTA")}
        >
          {!isTabletOrMobile && `Mi cuenta`}
        </Button>
      </Space>
    </Space>
  );
}
