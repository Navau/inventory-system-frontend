import React, { useState } from "react";
import { Layout, theme } from "antd";
import { useSizeScreen } from "../../hooks";
import { HeaderLayoutAdmin, MenuSider } from "../../components/Admin";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children, themeDark, setThemeDark } = props;
  const { Content, Sider, Header } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const [isBroken, setIsBroken] = useState(false);
  const { isLittleMobile } = useSizeScreen();
  const classNameCollapsed = () => {
    if (isLittleMobile === true) {
      if (collapsed === true) return "menu-short-mobile";
      if (collapsed === false) return "menu-short-little-mobile";
    } else {
      if (isBroken === true && collapsed === true) return "menu-short-mobile";
      if (isBroken === true && collapsed === false) return "menu-large";
      if (isBroken === false && collapsed === true) return "menu-short";
      if (isBroken === false && collapsed === false) return "menu-large";
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="admin-layout" hasSider>
      <Sider
        className="menu-sider"
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        trigger={null}
        collapsedWidth={isBroken ? 0 : 80}
        width={isLittleMobile ? 60 : 200}
        onBreakpoint={(broken) => {
          setIsBroken(broken);
          setCollapsed(broken);
        }}
        style={{
          background: colorBgContainer,
        }}
      >
        <MenuSider setCollapsed={setCollapsed} />
      </Sider>
      <Layout className={classNameCollapsed()}>
        <Header
          className="header-layout"
          style={{
            background: colorBgContainer,
          }}
        >
          <HeaderLayoutAdmin
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            themeDark={themeDark}
            setThemeDark={setThemeDark}
          />
        </Header>
        <Content className="admin-layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
}
