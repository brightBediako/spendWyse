import axios from "axios";
import { BASE_URL } from "../../utils/url";

// get user
export const getUserAPI = async (userId) => {
  const response = await axios.get(`${BASE_URL}users/${userId}`);
    //   return a promise that resolves to response data
    return response.data;
};

// update user
export const updateUserAPI = async (userId, userData) => {
  const response = await axios.put(`${BASE_URL}users/update/${userId}`, userData);
    //   return a promise that resolves to response data
    return response.data;
};

// delete user
export const deleteUserAPI = async (userId) => {
  const response = await axios.delete(`${BASE_URL}users/delete/${userId}`);
    //   return a promise that resolves to response data
    return response.data;
};