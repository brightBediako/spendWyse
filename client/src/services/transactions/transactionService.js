import axios from "axios";
import { BASE_URL } from "../../utils/url";

// add transaction
export const addTransactionAPI = async ({
  type,
  category,
  amount,
  date,
  description,
}) => {
  const response = await axios.post(
    `${BASE_URL}transactions/create-transaction`,
    {
      type,
      category,
      amount,
      date,
      description,
    }
  );
  //   return a promise that resolves to response data
  return response.data;
};

// get all transactions
export const getTransactionsAPI = async () => {
  const response = await axios.get(`${BASE_URL}transactions`);
  //   return a promise that resolves to response data
  return response.data;
};

// delete transaction
export const deleteTransactionAPI = async (transactionId) => {
  const response = await axios.delete(
    `${BASE_URL}transactions/delete/${transactionId}`
  );
  //   return a promise that resolves to response data
  return response.data;
};

// update transaction
export const updateTransactionAPI = async (
  transactionId,
  { type, category, amount, date, description }
) => {
  const response = await axios.put(
    `${BASE_URL}transactions/update/${transactionId}`,
    {
      amount,
      type,
      category,
      date,
      description,
    }
  );
  //   return a promise that resolves to response data
  return response.data;
};
