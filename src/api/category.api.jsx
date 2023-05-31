import axios from "axios";
import { BASE_API, TYPE_TOKEN } from "../utils";
import { isEmpty, isUndefined, map, size } from "lodash";

export async function getCategoriesApi(filters = {}) {
  try {
    const stringFilters = map(filters, (value, index) => {
      return `${index}=${value}`;
    }).join("&");
    const url = `${BASE_API}/api/categories/${
      !isEmpty(stringFilters) ? `?${stringFilters}` : ""
    }`;
    return await axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function searchCategoriesApi(search, active) {
  try {
    let url = "";
    url += `${BASE_API}/api/categories/`;
    url += !isEmpty(search) ? `?search=${encodeURIComponent(search)}` : "";
    url += !isUndefined(active)
      ? isEmpty(search)
        ? `?active=${active}`
        : `&active=${active}`
      : "";
    return await axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function getCategoryByIdApi(id) {
  try {
    const url = `${BASE_API}/api/categories/${id}/`;
    return await axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function addCategoryApi(data, token) {
  try {
    const url = `${BASE_API}/api/categories/`;
    const options = {
      headers: {
        // Authorization: `${TYPE_TOKEN} ${token}`,
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    return await axios
      .post(url, body, options)
      .then((response) => {
        const result = response.data;
        const status = response?.status;

        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function updateCategoryApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/categories/${id}/`;
    const options = {
      headers: {
        // Authorization: `${TYPE_TOKEN} ${token}`,
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    return await axios
      .patch(url, body, options)
      .then((response) => {
        const result = response.data;
        const status = response?.status;

        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function deleteCategoryApi(id, token) {
  try {
    const url = `${BASE_API}/api/categories/${id}/`;
    const options = {
      headers: {
        // Authorization: `${TYPE_TOKEN} ${token}`,
        "Content-Type": "application/json",
      },
    };
    return await axios
      .delete(url, options)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}
