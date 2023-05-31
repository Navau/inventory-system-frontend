import React, { useState, useEffect } from "react";
import { useProduct } from "../hooks";
import {
  TableProductsAdmin,
  MyHeaderPage,
  AddEditProductFormAdmin,
  DeleteProductFormAdmin,
  ProductDashboardAdmin,
} from "../components/Admin";
import { Loader, ModalAdmin } from "../components/Common";
import { renderError, renderMessageAction } from "../utils/renderHelpers";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

export function ProductsAdmin() {
  const {
    getProducts,
    searchProducts,
    products,
    loadingProduct,
    loadingSearchProduct,
    updateProduct,
  } = useProduct();
  const [active, setActive] = useState(undefined);
  const [titleModal, setTitleModal] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(undefined);
  const [refetch, setRefetch] = useState(false);
  const [actionModal, setActionModal] = useState(undefined);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchProductAux, setSearchProductAux] = useState(false);
  const [searchOptionFilter, setSearchOptionFilter] = useState(undefined);

  useEffect(() => {
    getProducts(active).catch((err) => renderError(err, "products", "getAll"));
  }, [refetch]);

  useEffect(() => {
    searchProducts(searchProduct, searchOptionFilter).catch((err) =>
      renderError(err, "products", "search")
    );
  }, [searchProduct, searchProductAux]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const handleSearchOptionChange = (e) => {
    setSearchOptionFilter(e.target.value);
    setSearchProductAux((prev) => !prev);
  };
  const onAddProduct = () => {
    setActionModal("add");
    setTitleModal("Nuevo Producto: ¡Agrega tus detalles!");
    setContentModal(
      <AddEditProductFormAdmin onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const onUpdateProduct = (product) => {
    setActionModal("update");
    setTitleModal(
      `Actualizar Detalles del Producto: ¡Haz los cambios necesarios!`
    );
    setContentModal(
      <AddEditProductFormAdmin
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={product}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = (product) => {
    setActionModal("delete");
    setTitleModal(`¡Atención! ¿Está seguro de eliminar este producto?`);
    setContentModal(
      <DeleteProductFormAdmin
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={product}
      />
    );
    openCloseModal();
  };

  const onChangeActiveProduct = async (product) => {
    await updateProduct(product.id, { active: !product.active }, "active")
      .then(() => {
        renderMessageAction("update", "Product");
      })
      .catch((err) => {
        renderError(err, "product", "update");
      })
      .finally(() => {
        setSearchOptionFilter(undefined);
        setActive(true);
        onRefetch();
      });
  };

  return (
    <>
      {loadingProduct ? (
        <Loader />
      ) : (
        <>
          <MyHeaderPage
            title="Productos"
            btnOptions={[
              {
                title: "Nuevo Producto",
                type: "primary",
                onClick: onAddProduct,
                icon: <PlusOutlined />,
              },
              {
                title: "Recargar Registros",
                type: "primary",
                onClick: onRefetch,
                icon: <ReloadOutlined />,
              },
            ]}
            inputOptions={[
              {
                title: "Busca algún producto",
                onSearch: setSearchProduct,
                filter: {
                  type: "search",
                  get: searchOptionFilter,
                  set: handleSearchOptionChange,
                },
                filters: [
                  { value: undefined, content: "Todos" },
                  { value: true, content: "Activos" },
                  { value: false, content: "Inactivos" },
                ],
              },
            ]}
          />
          {loadingSearchProduct ? (
            <Loader />
          ) : (
            <TableProductsAdmin
              products={products}
              onChangeActiveProduct={onChangeActiveProduct}
              onUpdateProduct={onUpdateProduct}
              onDeleteProduct={onDeleteProduct}
            />
          )}
          <ProductDashboardAdmin />
        </>
      )}
      <ModalAdmin
        title={titleModal}
        open={showModal}
        width={700}
        onClose={openCloseModal}
        actionModal={actionModal}
      >
        {contentModal}
      </ModalAdmin>
    </>
  );
}
