import { useState } from "react";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoryByIdApi,
  getCategoriesApi,
  updateCategoryApi,
} from "../api/category.api";

export function useCategory() {
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(undefined);
  //   const auth = useAuth()

  const getCategories = async () => {
    try {
      setLoadingCategory(true);
      const response = await getCategoriesApi();
      setLoadingCategory(false);
      setCategories(response);
    } catch (err) {
      setLoadingCategory(false);
      throw err;
    }
  };

  const getCategoryById = async () => {
    try {
      setLoadingCategory(true);
      const response = await getCategoryByIdApi();
      setLoadingCategory(false);
      setCategory(response);
    } catch (err) {
      setLoadingCategory(false);
      throw err;
    }
  };

  const addCategory = async (data) => {
    try {
      setLoadingCategory(true);
      const response = await addCategoryApi(data); //auth.token
      setLoadingCategory(false);
      setCategory(response);
    } catch (err) {
      setLoadingCategory(false);
      throw err;
    }
  };

  const updateCategory = async (data) => {
    try {
      setLoadingCategory(true);
      const response = await updateCategoryApi(data); //auth.token
      setLoadingCategory(false);
      setCategory(response);
    } catch (err) {
      setLoadingCategory(false);
      throw err;
    }
  };

  const deleteCategory = async (data) => {
    try {
      setLoadingCategory(true);
      const response = await deleteCategoryApi(data); //auth.token
      setLoadingCategory(false);
      setCategory(response);
    } catch (err) {
      setLoadingCategory(false);
      throw err;
    }
  };

  return {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    loadingCategory,
    categories,
    category,
  };
}
