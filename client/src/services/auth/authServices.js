import axios from "axios";
import { BASE_URL } from "../../utils/url";

// login user
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}auth/login`, {
    email,
    password,
  });
  //   return a promise that resolves to response data
  return response.data;
};

// register user
export const registerAPI = async ({ username, email, password }) => {
  const response = await axios.post(`${BASE_URL}auth/register`, {
    username,
    email,
    password,
  });
  //   return a promise that resolves to response data
  return response.data;
};


// lock user for 10 minutes after 5 failed login attempts
export const lockUserAPI = async () => {
  const response = await axios.post(`${BASE_URL}auth/lock`);
  return response.data;
}