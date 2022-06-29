import axiosAuth from "../apiConfig/axiosAuth";

const register = (data) => {
  return axiosAuth.post("signup", data);
};

const verifyOTP = (data) => {
  return axiosAuth.post("verify", data);
};

const login = (data) => {
  return axiosAuth.post("login", data);
};

const getUserById = (id) => {
  return axiosAuth.get(`get_user_by_id/${id}`);
};

const updateUserInfo = (data) => {
  return axiosAuth.patch("update_user_info", data);
};

const logOut = () => {
  delete localStorage.user;
  delete localStorage.jwt;
  window.location.reload();
};


// Handle all backend api call
export const userService = {
  register,
  login,
  logOut,
  verifyOTP,
  updateUserInfo,
  getUserById
};
