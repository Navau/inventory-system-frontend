import React from "react";
import { Button, Space, Typography } from "antd";
import { useCategory } from "../../../../hooks";

import "./ActiveCategoryFormAdmin.scss";

export function ActiveCategoryFormAdmin(props) {
  const { onClose, onSubmitActive } = props;
  const { loadingCategory } = useCategory();

  return (
    <div className="active-category-form-admin">
      <Typography.Text className="active-category-form-admin__warning-text">
        Recuerda que si desactivas una categoría, los productos asociados a ella
        quedarán sin categoría asignada. Ten en cuenta que esta acción eliminará
        la conexión entre la categoría y los productos afectados. Te
        recomendamos revisar cuidadosamente antes de realizar este cambio.
      </Typography.Text>
      <Space className="active-category-form-admin__actions" wrap>
        <Button
          type="primary"
          danger
          onClick={onClose}
          disabled={loadingCategory}
        >
          Cancelar
        </Button>
        <Button
          className="btn-submit-active"
          type="primary"
          loading={loadingCategory}
          onClick={onSubmitActive}
        >
          Lo entiendo, no hay problema
        </Button>
      </Space>
    </div>
  );
}
