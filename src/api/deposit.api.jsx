import axios from "axios";
import { BASE_API, TYPE_TOKEN } from "../utils";
import { isEmpty, isUndefined, map, size } from "lodash";

export async function getDepositsApi(filters = {}) {
  try {
    const stringFilters = map(filters, (value, index) => {
      return `${index}=${value}`;
    }).join("&");
    const url = `${BASE_API}/api/deposits/${
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

export async function searchDepositsApi(search, active) {
  try {
    let url = "";
    url += `${BASE_API}/api/deposits/`;
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

export async function getDepositByIdApi(id) {
  try {
    const url = `${BASE_API}/api/deposits/${id}/`;
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

export async function addDepositApi(data, token) {
  try {
    const url = `${BASE_API}/api/deposits/`;
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

export async function updateDepositApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/deposits/${id}/`;
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

export async function deleteDepositApi(id, token) {
  try {
    const url = `${BASE_API}/api/deposits/${id}/`;
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
