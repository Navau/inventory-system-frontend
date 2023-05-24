import React, { useState, useEffect } from "react";
import { useCategory, useDeposit, useProduct } from "../../../../hooks";
import {
  Form,
  Input,
  Space,
  Spin,
  Grid,
  Col,
  Row,
  Select,
  Button,
  notification,
} from "antd";
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

import "./AddEditProductFormAdmin.scss";

export function AddEditProductFormAdmin(props) {
  const { onClose, onRefetch, product = undefined } = props;
  const [loadingData, setLoadingData] = useState(false);
  // const [productData, setProductData] = useState(undefined);
  // const [categoriesData, setCategoriesData] = useState([]);
  // const [depositsData, setDepositsData] = useState([]);
  const { addProduct, updateProduct } = useProduct();
  const { categories, getCategories } = useCategory();
  const { deposits, getDeposits } = useDeposit();

  //TO DO: verificar porque tarda tanto al cargar junto al modal
  useEffect(() => {
    const fetchDataAux = async () => {
      setLoadingData(true);
      await getCategories();
      await getDeposits();
      setLoadingData(false);
    };
    fetchDataAux();
  }, []);

  if (loadingData) return <Spin size="large" />;
  // if (loadingData) return null;

  // console.log({ product, categories, deposits });

  return (
    <div className="add-edit-user-form-admin">
      <ProductForm
        product={product}
        categories={categories}
        deposits={deposits}
        addProduct={addProduct}
        updateProduct={updateProduct}
        loadingData={loadingData}
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
    loadingData,
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
          const responseAdd = await addProduct(formValue);
          notification["success"]({
            message: "Creado correctamente",
          });
        } else {
          const responseUpdate = await updateProduct(formValue);
          notification["success"]({
            message: "Actualizado correctamente",
          });
        }
        onRefetch();
        onClose();
      } catch (err) {
        notification["error"]({
          message: err.message,
        });
      }
    },
  });

  return (
    <Form className="form-add-edit" onSubmitCapture={formik.handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item>
            <Input
              name="name"
              prefix={<TagOutlined />}
              placeholder="Nombre del producto"
              status={formik.errors.name && "error"}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <span className="form-add-edit__error-label">
              {formik.errors.name}
            </span>
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              name="description"
              rows={3}
              maxLength={2000}
              status={formik.errors.description && "error"}
              placeholder="Descripción del producto"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <span className="form-add-edit__error-label">
              {formik.errors.description}
            </span>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={screens.md ? 12 : 24}>
          <Form.Item>
            <Input
              name="price"
              type="decimal"
              prefix={<DollarOutlined />}
              status={formik.errors.price && "error"}
              placeholder="Precio"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <span className="form-add-edit__error-label">
              {formik.errors.price}
            </span>
          </Form.Item>
        </Col>
        <Col span={screens.md ? 12 : 24}>
          <Form.Item>
            <Input
              name="stock"
              type="number"
              prefix={<StockOutlined />}
              placeholder="Stock"
              status={formik.errors.stock && "error"}
              value={formik.values.stock}
              onChange={formik.handleChange}
            />
            <span className="form-add-edit__error-label">
              {formik.errors.stock}
            </span>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={screens.md ? 12 : 24}>
          <Form.Item>
            <Select
              placeholder="Selecciona una Categoría"
              loading={loadingData}
              status={formik.errors.category && "error"}
              onChange={(_, e) => formik.setFieldValue("category", e.value)}
              value={formik.values.category}
            >
              {map(categories, (category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <span className="form-add-edit__error-label">
              {formik.errors.category}
            </span>
          </Form.Item>
        </Col>
        <Col span={screens.md ? 12 : 24}>
          <Form.Item>
            <Select
              placeholder="Selecciona un Deposito"
              loading={loadingData}
              status={formik.errors.deposit && "error"}
              onChange={(_, e) => formik.setFieldValue("deposit", e.value)}
              value={formik.values.deposit}
            >
              {map(deposits, (deposit) => (
                <Option key={deposit.id} value={deposit.id}>
                  {deposit.name}
                </Option>
              ))}
            </Select>
            <span className="form-add-edit__error-label">
              {formik.errors.deposit}
            </span>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {isUndefined(product) ? "Crear Producto" : "Actualizar Producto"}
        </Button>
      </Form.Item>
    </Form>
  );
}
