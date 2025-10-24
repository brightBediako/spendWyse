import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

// add Transaction
export const addTransactionAPI = async ({
  type,
  category,
  amount,
  date,
  description,
}) => {
  const response = await axios.post(
    `${BASE_URL}transaction/create-transaction`,
    {
      type,
      category,
      amount,
      date,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //   return a promise that resolves to response data
  return response.data;
};

// get all Transactions
export const getTransactionsAPI = async () => {
  const response = await axios.get(`${BASE_URL}transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //   return a promise that resolves to response data
  return response.data;
};

// delete Transaction
export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}transactions/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //   return a promise that resolves to response data
  return response.data;
};

// update Transaction
export const updateTransactionAPI = async ({
  type,
  category,
  amount,
  date,
  description,
  id,
}) => {
  const response = await axios.put(
    `${BASE_URL}categories/update/${id}`,
    {
      type,
      category,
      amount,
      date,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //   return a promise that resolves to response data
  return response.data;
};
