import React, { useState, useEffect } from "react";
import { useProduct } from "../hooks";
import {
  TableProductsAdmin,
  MyHeaderPage,
  AddEditProductFormAdmin,
} from "../components/Admin";
import { Loader, ModalAdmin } from "../components/Common";

export function ProductsAdmin() {
  const { getProducts, products, loading, error } = useProduct();
  const [titleModal, setTitleModal] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(undefined);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getProducts();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const onAddProduct = () => {
    setTitleModal("Nuevo Producto");
    setContentModal(
      <AddEditProductFormAdmin onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const onUpdateProduct = async (product) => {
    console.log({ product });
    setTitleModal(`Actualizar Producto (${product.id})`);
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
    setTitleModal(`Eliminar Producto (${product.id})`);
    setContentModal(<h1>ELIMINAR PRODUCTO {product.id}</h1>);
    openCloseModal();
  };

  //TO DO, MOSTRAR EL ERROR

  return (
    <>
      {loading ? (
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
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
        </>
      )}
      <ModalAdmin title={titleModal} open={showModal} onClose={openCloseModal}>
        {contentModal}
      </ModalAdmin>
    </>
  );
}
