import React from "react";
import { Table } from "antd";
import {
  productsColumnsTable,
  productsDataTable,
} from "../../../../utils/tablesOptions";

import "./TableProductsAdmin.scss";

export function TableProductsAdmin(props) {
  const { products, onUpdateProduct, onDeleteProduct } = props;
  return (
    <Table
      dataSource={productsDataTable(products)}
      columns={productsColumnsTable(onUpdateProduct, onDeleteProduct)}
      pagination={{
        position: ["bottomCenter"],
      }}
      scroll={{ x: 200 }}
    />
  );
}
