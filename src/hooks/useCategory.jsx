import { useState } from "react";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoryByIdApi,
  getCategoriesApi,
  searchCategoriesApi,
  updateCategoryApi,
} from "../api/category.api";
import { isUndefined } from "lodash";

export function useCategory() {
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingSearchCategory, setLoadingSearchCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(undefined);
  //   const auth = useAuth()
  const getCategories = async (changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingCategory(true);
      const response = await getCategoriesApi();
      if (isUndefined(changeActive)) setLoadingCategory(false);
      setCategories(response);
    } catch (err) {
      setLoadingCategory(false);
      throw err;
    }
  };

  const getCategoriesByFilters = async (filters) => {
    try {
      setLoadingCategory(true);
      const response = await getCategoriesApi(filters);
      setLoadingCategory(false);
      setCategories(response);
    } catch (err) {
      setLoadingCategory(false);
      throw err;
    }
  };

  const searchCategories = async (search, active) => {
    try {
      setLoadingSearchCategory(true);
      const response = await searchCategoriesApi(search, active);
      setLoadingSearchCategory(false);
      setCategories(response);
    } catch (err) {
      setLoadingSearchCategory(false);
      throw err;
    }
  };

  const getCategoryById = async (id) => {
    try {
      setLoadingCategory(true);
      const response = await getCategoryByIdApi(id);
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

  const updateCategory = async (id, data, changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingCategory(true);
      const response = await updateCategoryApi(id, data); //auth.token
      if (isUndefined(changeActive)) setLoadingCategory(false);
      if (isUndefined(changeActive)) setCategory(response);
    } catch (err) {
      setLoadingCategory(false);
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoadingCategory(true);
      const response = await deleteCategoryApi(id); //auth.token
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
    getCategoriesByFilters,
    searchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    loadingCategory,
    loadingSearchCategory,
    categories,
    category,
  };
}
