import React, { useEffect } from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import UpdatePassword from "./UpdatePassword";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserAPI, updateUserAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";


const UserProfile = () => {
  // Get logged-in user ID (from localStorage as used elsewhere in your codebase)
  const userObj = JSON.parse(localStorage.getItem('user'));
  const userId = userObj ? userObj._id : undefined;

  // Fetch user profile (must provide userId!)
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserAPI(userId),
    enabled: !!userId,
  });

  // mutation hook
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateUserAPI,
    mutationKey: ["update-profile"],
  });

  // formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    enableReinitialize: true,
    //Submit
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
        })
        .catch(e => {
        });
    },
  });

  // Clear the form after a successful update
  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
    }
  }, [isSuccess]);

  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-2 text-2xl text-center font-extrabold">
          Welcome {user?.username || "User"}
          <span className="text-gray-500 text-sm ml-2">
            {user?.email ? `<${user?.email}>` : ''}
          </span>
        </h1>
        {/* Summary card for user info */}
        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <div className="flex items-center mt-2"><FaUserCircle className="mr-2 text-gray-500" /> <span className="font-medium text-gray-800">{user?.username || '—'}</span></div>
          <div className="flex items-center mt-1"><FaEnvelope className="mr-2 text-gray-500" /> <span className="font-medium text-gray-800">{user?.email || '—'}</span></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Update Profile
        </h3>
        {/* display error messages */}
        {isPending && <AlertMessage type="loading" message="Updating..." />}
        {isError && <AlertMessage type="error" message={error?.response?.data?.message || "Something went wrong!"} />}
        {isSuccess && <AlertMessage type="success" message="Updated successful!" />}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* User Name Field */}
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                {...formik.getFieldProps("username")}
                type="text"
                id="username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your username"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <span className="text-xs text-red-500">
                {formik.errors.username}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword />
    </>
  );
};

export default UserProfile;
