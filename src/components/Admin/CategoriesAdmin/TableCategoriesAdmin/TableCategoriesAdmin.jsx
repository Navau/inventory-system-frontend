import React from "react";
import { Table } from "antd";
import {
  categoriesColumnsTable,
  categoriesDataTable,
} from "../../../../utils/tablesOptions";
import { customLocale, getRowClassName } from "../../../../utils/helpers";
import { useSizeScreen } from "../../../../hooks";

import "./TableCategoriesAdmin.scss";

export function TableCategoriesAdmin(props) {
  const {
    categories,
    onChangeActiveCategory,
    onUpdateCategory,
    onDeleteCategory,
  } = props;
  const { isTabletOrMobile } = useSizeScreen();
  return (
    <Table
      size={isTabletOrMobile ? "small" : "middle"}
      className="table-categories-admin"
      dataSource={categoriesDataTable(categories)}
      columns={categoriesColumnsTable(
        categories,
        onChangeActiveCategory,
        onUpdateCategory,
        onDeleteCategory
      )}
      pagination={{
        position: ["bottomCenter"],
        pageSize: 5,
        size: isTabletOrMobile ? "small" : "large",
      }}
      scroll={{ x: 200 }}
      rowClassName={getRowClassName}
      locale={customLocale}
    />
  );
}
