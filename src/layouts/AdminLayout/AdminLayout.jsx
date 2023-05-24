import React from "react";
import { Layout } from "antd";

import { MenuSider } from "../../components/Admin";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props;
  const { Content } = Layout;
  return (
    <Layout className="admin-layout">
      <div className="admin-layout__menu-sider">
        <MenuSider />
      </div>
      <Content className="admin-layout__content">{children}</Content>
    </Layout>
  );
}
