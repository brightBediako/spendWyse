import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

// add category
export const addCategoryAPI = async ({ type, name }) => {
  const response = await axios.post(
    `${BASE_URL}categories/create-category`,
    {
      type,
      name,
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

// get all categories
export const getCategoriesAPI = async () => {
  const response = await axios.get(`${BASE_URL}categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //   return a promise that resolves to response data
  return response.data;
};

// delete category
export const deleteCategoryAPI = async (categoryId) => {
  const response = await axios.delete(
    `${BASE_URL}categories/delete/${categoryId}`
  );
  //   return a promise that resolves to response data
  return response.data;
};

// update category
export const updateCategoryAPI = async (categoryId, { type, name }) => {
  const response = await axios.put(
    `${BASE_URL}categories/update/${categoryId}`,
    {
      type,
      name,
    }
  );
  //   return a promise that resolves to response data
  return response.data;
};
