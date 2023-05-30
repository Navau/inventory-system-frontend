import React, { useState } from "react";
import { Button, Space, Switch } from "antd";
import { find, findIndex, map } from "lodash";
import { DateTime } from "luxon";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const productsColumnsTable = (
  products,
  onChangeActiveProduct,
  onUpdateProduct,
  onDeleteProduct
) => {
  const [switchLoaderProducts, setSwitchLoaderProducts] = useState(
    map(products, (product) => {
      return { ...product, switchLoader: false };
    })
  );
  return [
    {
      title: "Código",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      // responsive: ["md"],
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      // responsive: ["sm"],
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      responsive: ["sm"],
    },
    {
      title: "Cantidad",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      responsive: ["sm"],
    },
    {
      title: "Ultima actualización",
      dataIndex: "update_at",
      key: "update_at",
      sorter: (a, b) => new Date(a.update_at) - new Date(b.update_at),
      responsive: ["lg"],
    },
    {
      title: "Depósito",
      dataIndex: "deposit",
      key: "deposit",
      responsive: ["lg"],
    },
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
      responsive: ["md"],
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      // responsive: ["sm"],
      render: (text, record) => {
        return (
          <Space wrap>
            <Switch
              key={`active-${record.id}`}
              checkedChildren="activo"
              unCheckedChildren="inactivo"
              loading={switchLoaderProducts[record.index].switchLoader}
              checked={record?.active}
              onChange={async () => {
                setSwitchLoaderProducts((prevProducts) =>
                  prevProducts.map((item, index) => {
                    if (index === record.index) {
                      return { ...item, switchLoader: true };
                    }
                    return item;
                  })
                );
                await onChangeActiveProduct(record);
                setSwitchLoaderProducts((prevProducts) =>
                  prevProducts.map((item, index) => {
                    if (index === record.index) {
                      return { ...item, switchLoader: false };
                    }
                    return item;
                  })
                );
              }}
            />
            <Button
              key={`update-${record.id}`}
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onUpdateProduct(record)}
            />
            <Button
              key={`delete-${record.id}`}
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteProduct(record)}
            />
          </Space>
        );
      },
    },
  ];
};

export const productsDataTable = (products) => {
  return map(products, (product, index) => {
    return {
      index,
      key: product.id,
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      active: product.active,
      update_at: DateTime.fromISO(product.update_at).toFormat(
        "yyyy-MM-dd HH:mm:ss"
      ),
      created_at: DateTime.fromISO(product.update_at).toFormat(
        "yyyy-MM-dd HH:mm:ss"
      ),
      deposit: product?.deposit_data.name || "Sin depósito",
      category: product?.category_data.name || "Sin categoría",
      id_deposit: product.deposit,
      id_category: product.category,
    };
  });
};
