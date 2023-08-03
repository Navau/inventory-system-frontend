import { useState } from "react";
import {
  addDepositApi,
  deleteDepositApi,
  getDepositByIdApi,
  getDepositsApi,
  searchDepositsApi,
  updateDepositApi,
} from "../api/deposit.api";
import { isUndefined } from "lodash";

export function useDeposit() {
  const [loadingDeposit, setLoadingDeposit] = useState(false);
  const [loadingSearchDeposit, setLoadingSearchDeposit] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [deposit, setDeposit] = useState(undefined);
  //   const auth = useAuth()
  const getDeposits = async (changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingDeposit(true);
      const response = await getDepositsApi();
      if (isUndefined(changeActive)) setLoadingDeposit(false);
      setDeposits(response);
    } catch (err) {
      setLoadingDeposit(false);
      throw err;
    }
  };

  const getDepositsByFilters = async (filters) => {
    try {
      setLoadingDeposit(true);
      const response = await getDepositsApi(filters);
      setLoadingDeposit(false);
      setDeposits(response);
    } catch (err) {
      setLoadingDeposit(false);
      throw err;
    }
  };

  const searchDeposits = async (search, active) => {
    try {
      setLoadingSearchDeposit(true);
      const response = await searchDepositsApi(search, active);
      setLoadingSearchDeposit(false);
      setDeposits(response);
    } catch (err) {
      setLoadingSearchDeposit(false);
      throw err;
    }
  };

  const getDepositById = async (id) => {
    try {
      setLoadingDeposit(true);
      const response = await getDepositByIdApi(id);
      setLoadingDeposit(false);
      setDeposit(response);
    } catch (err) {
      setLoadingDeposit(false);
      throw err;
    }
  };

  const addDeposit = async (data) => {
    try {
      setLoadingDeposit(true);
      const response = await addDepositApi(data); //auth.token
      setLoadingDeposit(false);
      setDeposit(response);
    } catch (err) {
      setLoadingDeposit(false);
      throw err;
    }
  };

  const updateDeposit = async (id, data, changeActive = undefined) => {
    try {
      if (isUndefined(changeActive)) setLoadingDeposit(true);
      const response = await updateDepositApi(id, data); //auth.token
      if (isUndefined(changeActive)) setLoadingDeposit(false);
      if (isUndefined(changeActive)) setDeposit(response);
    } catch (err) {
      setLoadingDeposit(false);
      throw err;
    }
  };

  const deleteDeposit = async (id) => {
    try {
      setLoadingDeposit(true);
      const response = await deleteDepositApi(id); //auth.token
      setLoadingDeposit(false);
      setDeposit(response);
    } catch (err) {
      setLoadingDeposit(false);
      throw err;
    }
  };

  return {
    getDeposits,
    getDepositById,
    getDepositsByFilters,
    searchDeposits,
    addDeposit,
    updateDeposit,
    deleteDeposit,
    loadingDeposit,
    loadingSearchDeposit,
    deposits,
    deposit,
  };
}
