import { useEffect } from "react";
import { useCategory } from "../../../../hooks";
import { Form, Input, Col, Row, Button, Space } from "antd";
import { isUndefined } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TagOutlined, FileTextOutlined } from "@ant-design/icons";

import {
  addSchemaCategory,
  initialValuesCategory,
  updateSchemaCategory,
} from "./AddEditCategoryFormAdmin.validations";

import {
  renderError,
  renderMessageAction,
} from "../../../../utils/renderHelpers";

import "./AddEditCategoryFormAdmin.scss";

export function AddEditCategoryFormAdmin(props) {
  const { onClose, onRefetch, category = undefined } = props;
  const { addCategory, updateCategory } = useCategory();

  return (
    <div className="add-edit-user-form-admin">
      <CategoryForm
        category={initialValuesCategory(category)}
        addCategory={addCategory}
        updateCategory={updateCategory}
        onClose={onClose}
        onRefetch={onRefetch}
      />
    </div>
  );
}

function CategoryForm(props) {
  const { category, addCategory, updateCategory, onClose, onRefetch } = props;
  const formik = useFormik({
    initialValues: initialValuesCategory(category),
    validationSchema: Yup.object(
      isUndefined(category)
        ? addSchemaCategory()
        : updateSchemaCategory(category)
    ),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        if (isUndefined(category)) {
          await addCategory(formValue);
          renderMessageAction("Category", "add");
        } else {
          const id = category?.id || -1;
          await updateCategory(id, formValue);
          renderMessageAction("Category", "update");
        }
        onRefetch();
        onClose();
      } catch (err) {
        renderError(
          err,
          "Categories",
          isUndefined(category) ? "add" : "update"
        );
      }
    },
  });

  useEffect(() => {
    formik.setValues(initialValuesCategory(category));
  }, [category]);

  return (
    <Form className="form-add-edit" onSubmitCapture={formik.handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            label={
              <Space>
                <TagOutlined />
                <span>Nombre de la categoría</span>
              </Space>
            }
            validateStatus={formik.errors.name ? "error" : ""}
            help={formik.errors.name}
            required
          >
            <Input
              name="name"
              placeholder="Nombre de la categoría"
              status={formik.errors.name && "error"}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            label={
              <Space>
                <FileTextOutlined />
                <span>Descripción de la categoría</span>
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
              placeholder="Descripción de la categoría"
              value={formik.values.description}
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
              isUndefined(category) ? "btn-submit-add" : "btn-submit-update"
            }
          >
            {isUndefined(category) ? "Crear Categoría" : "Actualizar Categoría"}
          </Button>
          <Button type="primary" danger onClick={onClose}>
            Cancelar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
