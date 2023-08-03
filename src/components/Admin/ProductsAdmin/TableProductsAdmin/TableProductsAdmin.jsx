import React from "react";
import { Table } from "antd";
import {
  productsColumnsTable,
  productsDataTable,
} from "../../../../utils/tablesOptions";
import { customLocale, getRowClassName } from "../../../../utils/helpers";
import { useSizeScreen } from "../../../../hooks";

import "./TableProductsAdmin.scss";

export function TableProductsAdmin(props) {
  const { products, onChangeActiveProduct, onUpdateProduct, onDeleteProduct } =
    props;
  const { isTabletOrMobile } = useSizeScreen();
  return (
    <Table
      size={isTabletOrMobile ? "small" : "middle"}
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
        pageSize: 5,
      }}
      scroll={{ x: 200 }}
      rowClassName={getRowClassName}
      locale={customLocale}
    />
  );
}
