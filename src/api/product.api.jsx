import axios from "axios";
import { BASE_API, TYPE_TOKEN } from "../utils";

export async function getProductsApi() {
  try {
    const url = `${BASE_API}/api/products/`;
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

export async function getProductByIdApi(id) {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
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

export async function addProductApi(data, token) {
  try {
    const url = `${BASE_API}/api/products/`;
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
        if (status !== 200 && status !== 201) throw result;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function updateProductApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
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
        if (status !== 200 && status !== 201) throw result;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}

export async function deleteProductApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/products/${id}`;
    const options = {
      headers: {
        // Authorization: `${TYPE_TOKEN} ${token}`,
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    return await axios
      .delete(url, body, options)
      .then((response) => {
        const result = response.data;
        const status = response?.status;
        if (status !== 200 && status !== 201) throw result;
        return result;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}
