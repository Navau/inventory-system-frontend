import React from "react";
import { Button, Descriptions, Space } from "antd";
import { map } from "lodash";
import { descriptionsDeleteCategory } from "../../../../utils/deleteOptions";

import { useCategory } from "../../../../hooks";
import { renderError } from "../../../../utils/renderHelpers";
import { renderMessageAction } from "../../../../utils/renderHelpers";

import "./DeleteCategoryFormAdmin.scss";

export function DeleteCategoryFormAdmin(props) {
  const { onClose, onRefetch, category } = props;
  const { deleteCategory, loadingCategory } = useCategory();
  const submitDelete = async () => {
    try {
      await deleteCategory(category.id);
      renderMessageAction("delete", "Category");
      onClose();
      onRefetch();
    } catch (err) {
      renderError(err, "category", "delete");
    }
  };
  return (
    <div className="delete-category-form-admin">
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
        {map(descriptionsDeleteCategory(category), (item, index) => (
          <Descriptions.Item key={index} label={item.title}>
            {item.content}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <Space className="delete-category-form-admin__actions" wrap>
        <Button
          type="default"
          danger
          onClick={onClose}
          disabled={loadingCategory}
        >
          Cancelar
        </Button>
        <Button
          type="primary"
          danger
          loading={loadingCategory}
          onClick={submitDelete}
        >
          Eliminar
        </Button>
      </Space>
    </div>
  );
}
