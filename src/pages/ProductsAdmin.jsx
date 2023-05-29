import React, { useState, useEffect } from "react";
import { useProduct } from "../hooks";
import {
  TableProductsAdmin,
  MyHeaderPage,
  AddEditProductFormAdmin,
  DeleteProductFormAdmin,
} from "../components/Admin";
import { Loader, ModalAdmin } from "../components/Common";
import { renderError, renderMessageAction } from "../utils/renderHelpers";

export function ProductsAdmin() {
  const { getProducts, products, loadingProduct, updateProduct } = useProduct();
  const [active, setActive] = useState(undefined);
  const [titleModal, setTitleModal] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(undefined);
  const [refetch, setRefetch] = useState(false);
  const [actionModal, setActionModal] = useState(undefined);

  useEffect(() => {
    getProducts(active).catch((err) => renderError(err, "products", "getAll"));
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

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
            btnTitle="Nuevo Producto"
            btnClick={onAddProduct}
          />
          <TableProductsAdmin
            products={products}
            onChangeActiveProduct={onChangeActiveProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
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
