import React from "react";
import { Button, Descriptions, Space } from "antd";
import { map } from "lodash";
import { descriptionsDeleteDeposit } from "../../../../utils/deleteOptions";

import { useDeposit } from "../../../../hooks";
import { renderError } from "../../../../utils/renderHelpers";
import { renderMessageAction } from "../../../../utils/renderHelpers";

import "./DeleteDepositFormAdmin.scss";

export function DeleteDepositFormAdmin(props) {
  const { onClose, onRefetch, deposit } = props;
  const { deleteDeposit, loadingDeposit } = useDeposit();
  const submitDelete = async () => {
    try {
      await deleteDeposit(deposit.id);
      renderMessageAction("Deposit", "delete");
      onClose();
      onRefetch();
    } catch (err) {
      renderError(err, "deposit", "delete");
    }
  };
  return (
    <div className="delete-deposit-form-admin">
      <Descriptions
        title="Información de categoría"
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
        {map(descriptionsDeleteDeposit(deposit), (item, index) => (
          <Descriptions.Item key={index} label={item.title}>
            {item.content}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <Space className="delete-deposit-form-admin__actions" wrap>
        <Button
          type="default"
          danger
          onClick={onClose}
          disabled={loadingDeposit}
        >
          Cancelar
        </Button>
        <Button
          type="primary"
          danger
          loading={loadingDeposit}
          onClick={submitDelete}
        >
          Eliminar
        </Button>
      </Space>
    </div>
  );
}
