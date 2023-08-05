import { useState } from "react";
import {
  Button,
  Collapse,
  Descriptions,
  Pagination,
  Space,
  Switch,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { map, size } from "lodash";
import { useSizeScreen } from "../../../../hooks";
import { DateTime } from "luxon";

import "./ListDepositsAdmin.scss";

export function ListDepositsAdmin(props) {
  const { deposits, onChangeActiveDeposit, onUpdateDeposit, onDeleteDeposit } =
    props;
  const { isTabletOrMobile } = useSizeScreen();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Cambia esto según tus necesidades
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleDeposits = deposits.slice(startIndex, startIndex + itemsPerPage);

  const depositGenExtraCollapse = (deposit) => {
    // const [switchLoaderDeposit, setSwitchLoaderDeposit] = useState(false);
    return (
      <Space key={deposit.id} wrap>
        <Switch
          key={`active-${deposit.id}`}
          checkedChildren="activo"
          unCheckedChildren="inactivo"
          // loading={switchLoaderDeposit}
          checked={deposit?.active}
          onChange={async () => {
            // setSwitchLoaderDeposit(true);
            await onChangeActiveDeposit(deposit);
            // setSwitchLoaderDeposit(false);
          }}
        />
        <Button
          key={`update-${deposit?.id}`}
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => onUpdateDeposit(deposit)}
        />
        <Button
          key={`delete-${deposit?.id}`}
          type="primary"
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => onDeleteDeposit(deposit)}
        />
      </Space>
    );
  };

  return (
    <>
      <Collapse
        className={classNames("collapse-deposits-admin", {
          active: isTabletOrMobile,
        })}
        size={isTabletOrMobile ? "small" : "large"}
        items={map(visibleDeposits, (deposit) => ({
          key: deposit.id,
          label: deposit?.name || "Sin nombre",
          extra: depositGenExtraCollapse(deposit),
          children: <ChildrenCollapse deposit={deposit} />,
          className: classNames("", {
            "active-panel": deposit.active,
            "inactive-panel": !deposit.active,
          }),
        }))}
      />
      <Pagination
        className="pagination-deposits-admin"
        size={isTabletOrMobile ? "small" : "large"}
        defaultCurrent={1}
        total={size(deposits)}
        pageSize={itemsPerPage}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

function ChildrenCollapse(props) {
  const { deposit } = props;
  return (
    <Descriptions
      bordered
      size="small"
      column={{
        xxl: 1,
        xl: 1,
        lg: 1,
        md: 1,
        sm: 1,
        xs: 1,
      }}
    >
      <Descriptions.Item label="Nombre">{deposit?.name}</Descriptions.Item>
      <Descriptions.Item label="Descripción">
        {deposit?.description}
      </Descriptions.Item>
      <Descriptions.Item label="Capacidad Máxima">
        {deposit?.capacity}
      </Descriptions.Item>
      <Descriptions.Item label="Dirección">
        {deposit?.address}
      </Descriptions.Item>
      <Descriptions.Item label="Creado en">
        {DateTime.fromISO(deposit?.created_at).toFormat("yyyy-MM-dd HH:mm:ss")}
      </Descriptions.Item>
      <Descriptions.Item label="Ultima vez actualizado en">
        {DateTime.fromISO(deposit?.update_at).toFormat("yyyy-MM-dd HH:mm:ss")}
      </Descriptions.Item>
    </Descriptions>
  );
}
