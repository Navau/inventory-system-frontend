import { useState } from "react";
import {
  addDepositApi,
  deleteDepositApi,
  getDepositByIdApi,
  getDepositsApi,
  updateDepositApi,
} from "../api/deposit.api";

export function useDeposit() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [deposit, setDeposit] = useState(undefined);
  //   const auth = useAuth()

  const getDeposits = async () => {
    try {
      setLoading(true);
      const response = await getDepositsApi();
      setLoading(false);
      setDeposits(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const getDepositById = async () => {
    try {
      setLoading(true);
      const response = await getDepositByIdApi();
      setLoading(false);
      setDeposit(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const addDeposit = async (data) => {
    try {
      setLoading(true);
      const response = await addDepositApi(data); //auth.token
      setLoading(false);
      setDeposit(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const updateDeposit = async (data) => {
    try {
      setLoading(true);
      const response = await updateDepositApi(data); //auth.token
      setLoading(false);
      setDeposit(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const deleteDeposit = async (data) => {
    try {
      setLoading(true);
      const response = await deleteDepositApi(data); //auth.token
      setLoading(false);
      setDeposit(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return {
    getDeposits,
    getDepositById,
    addDeposit,
    updateDeposit,
    deleteDeposit,
    loading,
    error,
    deposits,
    deposit,
  };
}
