import React, { useEffect } from "react";
import { useCategory, useDeposit, useProduct } from "../../../../hooks";
import { Form, Input, Spin, Grid, Col, Row, Select, Button, Space } from "antd";
import { isUndefined, map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TagOutlined,
  FileTextOutlined,
  DollarOutlined,
  StockOutlined,
  UnorderedListOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

import {
  addSchemaProduct,
  initialValuesProduct,
  updateSchemaProduct,
} from "./AddEditProductFormAdmin.validations";

import {
  renderError,
  renderMessageAction,
} from "../../../../utils/renderHelpers";

import "./AddEditProductFormAdmin.scss";

export function AddEditProductFormAdmin(props) {
  const { onClose, onRefetch, product = undefined } = props;
  const { addProduct, updateProduct } = useProduct();
  const { loadingCategory, categories, getCategoriesByFilters } = useCategory();
  const { loadingDeposit, deposits, getDepositsByFilters } = useDeposit();

  //TO DO: verificar porque tarda tanto al cargar junto al modal
  // useEffect(() => {
  //   const fetchDataAux = async () => {
  //     setLoadingData(true);
  //     await getCategories();
  //     await getDeposits();
  //     setLoadingData(false);
  //   };
  //   fetchDataAux();
  // }, [product]);
  useEffect(() => {
    (async () => {
      await getCategoriesByFilters({ active: true }).catch((err) =>
        renderError(err, "category", "getAll")
      );
      await getDepositsByFilters({ active: true }).catch((err) =>
        renderError(err, "deposit", "getAll")
      );
    })();
  }, [product]);

  if (loadingCategory || loadingDeposit) return <Spin size="large" />;

  return (
    <div className="add-edit-user-form-admin">
      <ProductForm
        product={product}
        categories={categories}
        deposits={deposits}
        addProduct={addProduct}
        updateProduct={updateProduct}
        loadingCategory={loadingCategory}
        loadingDeposit={loadingDeposit}
        onRefetch={onRefetch}
        onClose={onClose}
      />
    </div>
  );
}

function ProductForm(props) {
  const {
    product,
    categories,
    deposits,
    addProduct,
    updateProduct,
    loadingCategory,
    loadingDeposit,
    onClose,
    onRefetch,
  } = props;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { Option } = Select;

  const formik = useFormik({
    initialValues: initialValuesProduct(product),
    validationSchema: Yup.object(
      isUndefined(product) ? addSchemaProduct() : updateSchemaProduct(product)
    ),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        if (isUndefined(product)) {
          await addProduct(formValue);
          renderMessageAction("add", "Product");
        } else {
          const id = product?.id || -1;
          await updateProduct(id, formValue);
          renderMessageAction("update", "Product");
        }
        onRefetch();
        onClose();
      } catch (err) {
        renderError(err, "Products", isUndefined(product) ? "add" : "update");
      }
    },
  });

  return (
    <Form className="form-add-edit" onSubmitCapture={formik.handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            label={
              <Space>
                <TagOutlined />
                <span>Nombre del producto</span>
              </Space>
            }
            validateStatus={formik.errors.name ? "error" : ""}
            help={formik.errors.name}
          >
            <Input
              name="name"
              placeholder="Nombre del producto"
              status={formik.errors.name && "error"}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            label={
              <Space>
                <FileTextOutlined />
                <span>Descripción del producto</span>
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
              placeholder="Descripción del producto"
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
                <DollarOutlined />
                <span>Precio</span>
              </Space>
            }
            validateStatus={formik.errors.price ? "error" : ""}
            help={formik.errors.price}
          >
            <Input
              name="price"
              type="decimal"
              status={formik.errors.price && "error"}
              placeholder="Precio"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={screens.md ? 12 : 24}>
          <Form.Item
            label={
              <Space>
                <StockOutlined />
                <span>Stock</span>
              </Space>
            }
            validateStatus={formik.errors.stock ? "error" : ""}
            help={formik.errors.stock}
          >
            <Input
              name="stock"
              type="number"
              placeholder="Stock"
              status={formik.errors.stock && "error"}
              value={formik.values.stock}
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
                <UnorderedListOutlined />
                <span>Categoría</span>
              </Space>
            }
            validateStatus={formik.errors.category ? "error" : ""}
            help={formik.errors.category}
          >
            <Select
              placeholder="Selecciona una Categoría"
              loading={loadingCategory}
              status={formik.errors.category && "error"}
              onChange={(_, e) => formik.setFieldValue("category", e.value)}
              value={formik.values.category}
              defaultValue={undefined}
            >
              {map(categories, (category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={screens.md ? 12 : 24}>
          <Form.Item
            label={
              <Space>
                <ApartmentOutlined />
                <span>Depósito</span>
              </Space>
            }
            validateStatus={formik.errors.deposit ? "error" : ""}
            help={formik.errors.deposit}
          >
            <Select
              placeholder="Selecciona un Depósito"
              loading={loadingDeposit}
              status={formik.errors.deposit && "error"}
              onChange={(_, e) => formik.setFieldValue("deposit", e.value)}
              value={formik.values.deposit}
              defaultValue={undefined}
            >
              {map(deposits, (deposit) => (
                <Option key={deposit.id} value={deposit.id}>
                  {deposit.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="form-add-edit__actions">
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            className={
              isUndefined(product) ? "btn-submit-add" : "btn-submit-update"
            }
          >
            {isUndefined(product) ? "Crear Producto" : "Actualizar Producto"}
          </Button>
          <Button type="primary" danger onClick={onClose}>
            Cancelar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
