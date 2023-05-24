import React from "react";
import { Button, Space } from "antd";
import { map } from "lodash";
import { DateTime } from "luxon";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const productsColumnsTable = (onUpdateProduct, onDeleteProduct) => {
  return [
    { title: "Código", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Precio", dataIndex: "price", key: "price" },
    { title: "Cantidad", dataIndex: "stock", key: "stock" },
    { title: "Ultima actualización", dataIndex: "update_at", key: "update_at" },
    { title: "Deposito", dataIndex: "deposit", key: "deposit" },
    { title: "Categoría", dataIndex: "category", key: "category" },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space wrap>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onUpdateProduct(record)}
          />
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteProduct(record)}
          />
        </Space>
      ),
    },
  ];
};

export const productsDataTable = (products) => {
  return map(products, (product) => {
    return {
      key: product.id,
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      update_at: DateTime.fromISO(product.update_at).toFormat(
        "yyyy-MM-dd HH:mm:ss"
      ),
      deposit: product?.deposit_data.name || "Sin deposito",
      category: product?.category_data.name || "Sin categoría",
    };
  });
};
