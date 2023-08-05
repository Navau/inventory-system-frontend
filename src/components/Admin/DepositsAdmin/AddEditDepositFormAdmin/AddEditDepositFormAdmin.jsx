import { useEffect } from "react";
import { useDeposit } from "../../../../hooks";
import { Form, Input, Grid, Col, Row, Button, Space } from "antd";
import { isUndefined } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TagOutlined,
  FileTextOutlined,
  StockOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import {
  addSchemaDeposit,
  initialValuesDeposit,
  updateSchemaDeposit,
} from "./AddEditDepositFormAdmin.validation";

import {
  renderError,
  renderMessageAction,
} from "../../../../utils/renderHelpers";

import "./AddEditDepositFormAdmin.scss";

export function AddEditDepositFormAdmin(props) {
  const { onClose, onRefetch, deposit = undefined } = props;
  const { addDeposit, updateDeposit } = useDeposit();

  return (
    <div className="add-edit-user-form-admin">
      <DepositForm
        deposit={deposit}
        addDeposit={addDeposit}
        updateDeposit={updateDeposit}
        onClose={onClose}
        onRefetch={onRefetch}
      />
    </div>
  );
}

function DepositForm(props) {
  const { deposit, addDeposit, updateDeposit, onClose, onRefetch } = props;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const formik = useFormik({
    initialValues: initialValuesDeposit(deposit),
    validationSchema: Yup.object(
      isUndefined(deposit) ? addSchemaDeposit() : updateSchemaDeposit(deposit)
    ),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        if (isUndefined(deposit)) {
          await addDeposit(formValue);
          renderMessageAction("Deposit", "add");
        } else {
          const id = deposit?.id || -1;
          await updateDeposit(id, formValue);
          renderMessageAction("Deposit", "update");
        }
        onRefetch();
        onClose();
      } catch (err) {
        renderError(err, "Deposits", isUndefined(deposit) ? "add" : "update");
      }
    },
  });

  useEffect(() => {
    formik.setValues(initialValuesDeposit(deposit));
  }, [deposit]);

  return (
    <Form className="form-add-edit" onSubmitCapture={formik.handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            label={
              <Space>
                <TagOutlined />
                <span>Nombre del depósito</span>
              </Space>
            }
            validateStatus={formik.errors.name ? "error" : ""}
            help={formik.errors.name}
            required
          >
            <Input
              name="name"
              placeholder="Nombre del depósito"
              status={formik.errors.name && "error"}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            label={
              <Space>
                <FileTextOutlined />
                <span>Descripción del depósito</span>
              </Space>
            }
            validateStatus={formik.errors.description ? "error" : ""}
            help={formik.errors.description}
          >
            <Input.TextArea
              name="description"
              rows={3}
              maxLength={2000}
              status={formik.errors.description && "error"}
              placeholder="Descripción del depósito"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={screens.md ? 12 : 24}>
          <Form.Item
            label={
              <Space>
                <StockOutlined />
                <span>Capacidad Máxima</span>
              </Space>
            }
            validateStatus={formik.errors.capacity ? "error" : ""}
            help={formik.errors.capacity}
            required
          >
            <Input
              name="capacity"
              type="decimal"
              status={formik.errors.capacity && "error"}
              placeholder="Capacidad Máxima"
              value={formik.values.capacity}
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={screens.md ? 12 : 24}>
          <Form.Item
            label={
              <Space>
                <ShopOutlined />
                <span>Dirección</span>
              </Space>
            }
            validateStatus={formik.errors.address ? "error" : ""}
            help={formik.errors.address}
          >
            <Input
              name="address"
              placeholder="Dirección"
              status={formik.errors.address && "error"}
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="form-add-edit__actions">
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            className={
              isUndefined(deposit) ? "btn-submit-add" : "btn-submit-update"
            }
          >
            {isUndefined(deposit) ? "Crear Depósito" : "Actualizar Depósito"}
          </Button>
          <Button type="primary" danger onClick={onClose}>
            Cancelar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
