import axios from "axios";
import { BASE_URL } from "../../utils/url";

// login user
export const loginAPI = async (userData) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData);
    return response.data;
};

// register user
export const registerAPI = async (userData) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
};