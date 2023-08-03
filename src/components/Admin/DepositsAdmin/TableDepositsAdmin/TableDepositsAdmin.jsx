import React from "react";
import { Table } from "antd";
import {
  depositsColumnsTable,
  depositsDataTable,
} from "../../../../utils/tablesOptions";
import { customLocale, getRowClassName } from "../../../../utils/helpers";
import { useSizeScreen } from "../../../../hooks";

import "./TableDepositsAdmin.scss";

export function TableDepositsAdmin(props) {
  const { deposits, onChangeActiveDeposit, onUpdateDeposit, onDeleteDeposit } =
    props;
  const { isTabletOrMobile } = useSizeScreen();
  return (
    <Table
      size={isTabletOrMobile ? "small" : "middle"}
      className="table-deposits-admin"
      dataSource={depositsDataTable(deposits)}
      columns={depositsColumnsTable(
        deposits,
        onChangeActiveDeposit,
        onUpdateDeposit,
        onDeleteDeposit
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
