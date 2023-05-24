import React, { useState } from "react";
import { Menu, Layout, Button } from "antd";

import "./MenuSider.scss";
import { Link, useLocation } from "react-router-dom";
import { adminRoutesOptions } from "../../../utils/nameRoutes";
import { map } from "lodash";
import { useMediaQuery } from "react-responsive";

export function MenuSider() {
  const { Sider } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const menuItems = map(adminRoutesOptions, (route, index) => {
    return getItem(
      <Link to={route.path}>
        <span className="menu-sider__nav-text">{route.nameMenuSider}</span>
      </Link>,
      index,
      route.iconMenuSider
    );
  });

  return (
    <Sider
      className="menu-sider"
      collapsible
      collapsed={isTabletOrMobile}
      trigger={null}
    >
      <Menu
        defaultSelectedKeys={location.pathname}
        mode="inline"
        theme="dark"
        items={menuItems}
      />
      {/* <Button onClick={() => setCollapsed(!collapsed)}>TOGGLE</Button> */}
    </Sider>
  );
}

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
