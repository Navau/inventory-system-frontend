import {
  IdcardOutlined,
  TagOutlined,
  DollarOutlined,
  StockOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Space } from "antd";

export const descriptionsDeleteProduct = (product) => {
  return {
    código: {
      title: (
        <Space>
          <IdcardOutlined /> <span>Código</span>
        </Space>
      ),
      content: product.id,
    },
    producto: {
      title: (
        <Space>
          <TagOutlined /> <span>Producto</span>
        </Space>
      ),
      content: product.name,
    },
    precio: {
      title: (
        <Space>
          <DollarOutlined /> <span>Precio</span>
        </Space>
      ),
      content: product.price,
    },
    "cantidad existente": {
      title: (
        <Space>
          <StockOutlined /> <span>Cantidad existente</span>
        </Space>
      ),
      content: product.stock,
    },
    "creado en": {
      title: (
        <Space>
          <ClockCircleOutlined /> <span>Creado en</span>
        </Space>
      ),
      content: product.created_at,
    },
    categoría: {
      title: (
        <Space>
          <UnorderedListOutlined /> <span>Categoría</span>
        </Space>
      ),
      content: product.category,
    },
    depósito: {
      title: (
        <Space>
          <ApartmentOutlined /> <span>Depósito</span>
        </Space>
      ),
      content: product.deposit,
    },
  };
};

export const descriptionsDeleteCategory = (product) => {
  return {
    código: {
      title: (
        <Space>
          <IdcardOutlined /> <span>Código</span>
        </Space>
      ),
      content: product.id,
    },
    producto: {
      title: (
        <Space>
          <TagOutlined /> <span>Categoría</span>
        </Space>
      ),
      content: product.name,
    },
    "creado en": {
      title: (
        <Space>
          <ClockCircleOutlined /> <span>Creado en</span>
        </Space>
      ),
      content: product.created_at,
    },
  };
};

export const descriptionsDeleteDeposit = (product) => {
  return {
    código: {
      title: (
        <Space>
          <IdcardOutlined /> <span>Código</span>
        </Space>
      ),
      content: product.id,
    },
    producto: {
      title: (
        <Space>
          <TagOutlined /> <span>Categoría</span>
        </Space>
      ),
      content: product.name,
    },
    "creado en": {
      title: (
        <Space>
          <ClockCircleOutlined /> <span>Creado en</span>
        </Space>
      ),
      content: product.created_at,
    },
  };
};
