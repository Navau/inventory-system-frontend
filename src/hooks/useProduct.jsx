import { useState } from "react";
import {
  addProductApi,
  deleteProductApi,
  getProductByIdApi,
  getProductsApi,
  searchProductsApi,
  updateProductApi,
} from "../api/product.api";
import { isUndefined } from "lodash";

export function useProduct() {
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingSearchProduct, setLoadingSearchProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(undefined);
  //   const auth = useAuth()
  const getProducts = async (changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingProduct(true);
      const response = await getProductsApi();
      if (isUndefined(changeActive)) setLoadingProduct(false);
      setProducts(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const searchProducts = async (search) => {
    try {
      setLoadingSearchProduct(true);
      const response = await searchProductsApi(search);
      setLoadingSearchProduct(false);
      setProducts(response);
    } catch (err) {
      setLoadingSearchProduct(false);
      throw err;
    }
  };

  const getProductById = async (id) => {
    try {
      setLoadingProduct(true);
      const response = await getProductByIdApi(id);
      setLoadingProduct(false);
      setProduct(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const addProduct = async (data) => {
    try {
      setLoadingProduct(true);
      const response = await addProductApi(data); //auth.token
      setLoadingProduct(false);
      setProduct(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const updateProduct = async (id, data, changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingProduct(true);
      const response = await updateProductApi(id, data); //auth.token
      if (isUndefined(changeActive)) setLoadingProduct(false);
      if (isUndefined(changeActive)) setProduct(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoadingProduct(true);
      const response = await deleteProductApi(id); //auth.token
      setLoadingProduct(false);
      setProduct(response);
    } catch (err) {
      setLoadingProduct(false);
      throw err;
    }
  };

  return {
    getProducts,
    getProductById,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    loadingProduct,
    loadingSearchProduct,
    products,
    product,
  };
}
