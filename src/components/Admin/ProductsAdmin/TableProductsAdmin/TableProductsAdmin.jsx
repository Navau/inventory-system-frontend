import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {
  productsColumnsTable,
  productsDataTable,
} from "../../../../utils/tablesOptions";

import "./TableProductsAdmin.scss";

export function TableProductsAdmin(props) {
  const { products, onChangeActiveProduct, onUpdateProduct, onDeleteProduct } =
    props;
  const getRowClassName = (record) => {
    return record.active ? "active-row" : "inactive-row";
  };
  return (
    <Table
      className="table-products-admin"
      dataSource={productsDataTable(products)}
      columns={productsColumnsTable(
        products,
        onChangeActiveProduct,
        onUpdateProduct,
        onDeleteProduct
      )}
      pagination={{
        position: ["bottomCenter"],
      }}
      scroll={{ x: 200 }}
      rowClassName={getRowClassName}
    />
  );
}
