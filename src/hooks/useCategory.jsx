import { useState } from "react";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoryByIdApi,
  getCategoriesApi,
  updateCategoryApi,
} from "../api/category.api";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(undefined);
  //   const auth = useAuth()

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi();
      setLoading(false);
      setCategories(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const getCategoryById = async () => {
    try {
      setLoading(true);
      const response = await getCategoryByIdApi();
      setLoading(false);
      setCategory(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const addCategory = async (data) => {
    try {
      setLoading(true);
      const response = await addCategoryApi(data); //auth.token
      setLoading(false);
      setCategory(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const updateCategory = async (data) => {
    try {
      setLoading(true);
      const response = await updateCategoryApi(data); //auth.token
      setLoading(false);
      setCategory(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const deleteCategory = async (data) => {
    try {
      setLoading(true);
      const response = await deleteCategoryApi(data); //auth.token
      setLoading(false);
      setCategory(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
    categories,
    category,
  };
}
