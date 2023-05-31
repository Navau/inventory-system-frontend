import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { adminRoutesOptions } from "../../../utils/nameRoutes";
import { map, size } from "lodash";

import "./MenuSider.scss";
import { useSizeScreen } from "../../../hooks";

export function MenuSider(props) {
  const { setCollapsed } = props;
  const location = useLocation();
  const { isTabletOrMobile } = useSizeScreen();

  const menuItems = map(adminRoutesOptions, (route, index) => {
    return getItem(
      <Link
        to={route.path}
        onClick={() => isTabletOrMobile && setCollapsed(true)}
      >
        <span className="menu-sider__nav-text">{route.nameMenuSider}</span>
      </Link>,
      index,
      route.iconMenuSider
    );
  });

  return (
    <Menu
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      items={menuItems}
    />
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
