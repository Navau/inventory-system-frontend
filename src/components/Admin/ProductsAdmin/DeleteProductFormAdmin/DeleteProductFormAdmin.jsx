import React from "react";
import { Button, Descriptions, Space } from "antd";
import { map } from "lodash";
import { descriptionsDeleteProduct } from "../../../../utils/deleteOptions";

import { useProduct } from "../../../../hooks";
import { renderError } from "../../../../utils/renderHelpers";
import { renderMessageAction } from "../../../../utils/renderHelpers";

import "./DeleteProductFormAdmin.scss";

export function DeleteProductFormAdmin(props) {
  const { onClose, onRefetch, product } = props;
  const { deleteProduct, loadingProduct } = useProduct();
  const submitDelete = async () => {
    try {
      await deleteProduct(product.id);
      renderMessageAction("delete", "Product");
      onClose();
      onRefetch();
    } catch (err) {
      renderError(err, "product", "delete");
    }
  };
  return (
    <div className="delete-product-form-admin">
      <Descriptions
        title="Información de producto"
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
        {map(descriptionsDeleteProduct(product), (item, index) => (
          <Descriptions.Item key={index} label={item.title}>
            {item.content}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <Space className="delete-product-form-admin__actions" wrap>
        <Button
          type="default"
          danger
          onClick={onClose}
          disabled={loadingProduct}
        >
          Cancelar
        </Button>
        <Button
          type="primary"
          danger
          loading={loadingProduct}
          onClick={submitDelete}
        >
          Eliminar
        </Button>
      </Space>
    </div>
  );
}
