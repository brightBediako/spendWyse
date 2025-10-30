import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// get token
const token = getUserFromStorage();

// get user (profile for the currently authenticated user)
export const getUserAPI = async () => {
  // use the token helper which reads from `userInfo`
  const authToken = getUserFromStorage();
  const response = await axios.get(`${BASE_URL}profile`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  // return a promise that resolves to response data
  return response.data;
};

// update user
export const updateUserAPI = async (data) => {
  // accept a single payload object so callers can pass the form values directly
  const { username, email } = data || {};
  const response = await axios.put(
    `${BASE_URL}profile/update-profile`,
    {
      username,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // return a promise that resolves to response data
  return response.data;
};

// change password
export const changePasswordAPI = async (newPassword) => {
  const response = await axios.put(
    `${BASE_URL}profile/change-password`,
    {
      newPassword,
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

// delete user
export const deleteUserAPI = async (userId) => {
  const response = await axios.delete(`${BASE_URL}profile/delete/${userId}`);
  //   return a promise that resolves to response data
  return response.data;
};
