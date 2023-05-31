import { useState } from "react";
import {
  addDepositApi,
  deleteDepositApi,
  getDepositByIdApi,
  getDepositsApi,
  updateDepositApi,
} from "../api/deposit.api";

export function useDeposit() {
  const [loadingDeposit, setLoadingDeposit] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [deposit, setDeposit] = useState(undefined);
  //   const auth = useAuth()

  const getDeposits = async () => {
    try {
      setLoadingDeposit(true);
      const response = await getDepositsApi();
      setLoadingDeposit(false);
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

  const getDepositById = async () => {
    try {
      setLoadingDeposit(true);
      const response = await getDepositByIdApi();
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

  const updateDeposit = async (id, data) => {
    try {
      setLoadingDeposit(true);
      const response = await updateDepositApi(id, data); //auth.token
      setLoadingDeposit(false);
      setDeposit(response);
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
    addDeposit,
    updateDeposit,
    deleteDeposit,
    loadingDeposit,
    deposits,
    deposit,
  };
}
