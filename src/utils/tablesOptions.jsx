import React, { useState } from "react";
import { Button, Space, Switch } from "antd";
import { map } from "lodash";
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
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
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
      responsive: ["sm", "md"],
    },
    {
      title: "Depósito",
      dataIndex: "deposit",
      key: "deposit",
      responsive: ["sm", "md"],
    },
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
      responsive: ["sm", "md"],
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <Space wrap>
            <Switch
              key={`active-${record.id}`}
              checkedChildren="activo"
              unCheckedChildren="inactivo"
              loading={
                switchLoaderProducts[record.index]?.switchLoader || false
              }
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
      created_at: DateTime.fromISO(product.created_at).toFormat(
        "yyyy-MM-dd HH:mm:ss"
      ),
      deposit: product?.deposit_data?.name || "Sin depósito",
      category: product?.category_data?.name || "Sin categoría",
      id_deposit: product?.deposit,
      id_category: product?.category,
    };
  });
};

export const categoriesColumnsTable = (
  categories,
  onChangeActiveCategory,
  onUpdateCategory,
  onDeleteCategory
) => {
  const [switchLoaderCategories, setSwitchLoaderCategories] = useState(
    map(categories, (category) => {
      return { ...category, switchLoader: false };
    })
  );
  return [
    {
      title: "Código",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      responsive: ["sm", "md"],
    },
    {
      title: "Ultima actualización",
      dataIndex: "update_at",
      key: "update_at",
      sorter: (a, b) => new Date(a.update_at) - new Date(b.update_at),
      responsive: ["sm", "md"],
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <Space wrap>
            <Switch
              key={`active-${record.id}`}
              checkedChildren="activo"
              unCheckedChildren="inactivo"
              loading={
                switchLoaderCategories[record.index]?.switchLoader || false
              }
              checked={record?.active}
              onChange={async () => {
                setSwitchLoaderCategories((prevCategories) =>
                  prevCategories.map((item, index) => {
                    if (index === record.index) {
                      return { ...item, switchLoader: true };
                    }
                    return item;
                  })
                );
                await onChangeActiveCategory(record);
                setSwitchLoaderCategories((prevCategories) =>
                  prevCategories.map((item, index) => {
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
              onClick={() => onUpdateCategory(record)}
            />
            <Button
              key={`delete-${record.id}`}
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteCategory(record)}
            />
          </Space>
        );
      },
    },
  ];
};

export const categoriesDataTable = (categories) => {
  return map(categories, (category, index) => {
    return {
      index,
      key: category.id,
      id: category.id,
      name: category.name,
      description: category.description,
      active: category.active,
      update_at: DateTime.fromISO(category.update_at).toFormat(
        "yyyy-MM-dd HH:mm:ss"
      ),
      created_at: DateTime.fromISO(category.created_at).toFormat(
        "yyyy-MM-dd HH:mm:ss"
      ),
    };
  });
};
