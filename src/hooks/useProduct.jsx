import { useState } from "react";
import {
  addProductApi,
  deleteProductApi,
  getProductByIdApi,
  getProductsApi,
  updateProductApi,
} from "../api/product.api";

export function useProduct() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(undefined);
  //   const auth = useAuth()

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setLoading(false);
      setProducts(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const getProductById = async (id) => {
    try {
      setLoading(true);
      const response = await getProductByIdApi(id);
      setLoading(false);
      setProduct(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      const response = await addProductApi(data); //auth.token
      setLoading(false);
      setProduct(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateProduct = async (data) => {
    try {
      setLoading(true);
      const response = await updateProductApi(data); //auth.token
      setLoading(false);
      setProduct(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const deleteProduct = async (data) => {
    try {
      setLoading(true);
      const response = await deleteProductApi(data); //auth.token
      setLoading(false);
      setProduct(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    loading,
    error,
    products,
    product,
  };
}
