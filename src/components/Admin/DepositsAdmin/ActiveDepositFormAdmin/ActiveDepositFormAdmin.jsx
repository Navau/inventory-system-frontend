import { Button, Space, Typography } from "antd";
import { useDeposit } from "../../../../hooks";

import "./ActiveDepositFormAdmin.scss";

export function ActiveDepositFormAdmin(props) {
  const { onClose, onSubmitActive } = props;
  const { loadingDeposit } = useDeposit();

  return (
    <div className="active-deposit-form-admin">
      <Typography.Text className="active-deposit-form-admin__warning-text">
        Recuerda que si desactivas una categoría, los productos asociados a ella
        quedarán sin categoría asignada. Ten en cuenta que esta acción eliminará
        la conexión entre la categoría y los productos afectados. Te
        recomendamos revisar cuidadosamente antes de realizar este cambio.
      </Typography.Text>
      <Space className="active-deposit-form-admin__actions" wrap>
        <Button
          type="primary"
          danger
          onClick={onClose}
          disabled={loadingDeposit}
        >
          Cancelar
        </Button>
        <Button
          className="btn-submit-active"
          type="primary"
          loading={loadingDeposit}
          onClick={onSubmitActive}
        >
          Lo entiendo, no hay problema
        </Button>
      </Space>
    </div>
  );
}
