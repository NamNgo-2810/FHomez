import axios from "axios";
import axiosHome from "../apiConfig/axiosHome";

const getAll = () => {
  return axiosHome.get("get_all_home");
};

const getHomeById = (id) => {
  return axiosHome.get("get_by_home_id", id);
};

const addHome = (data) => {
  return axiosHome.post("/", data);
};

// const updateHome = (data) => {
//   return axiosHome.put("/", data);
// };

const deleteHome = (id) => {
  return axiosHome.delete("/", { motel_id: id });
};

const search = (data) => {
    return axiosHome.get("search", data);
};

const addReview = (data) => {
  return axiosHome.post("review", data);
};

const getCommentByMotel = (id) => {
  return axiosHome.get("getCommentByMotel", { motel_id: id });
};

const deleteComment = (id) => {
  return axiosHome.delete("deleteComment", { review_id: id });
};

const sendRequestVerify = (id) => {
  return axiosHome.post("verifyOwner",{user_id: id});
}

export const productService = {
  getAll,
  getHomeById,
  search,
  addHome,
  deleteComment,
  getCommentByMotel,
  addReview,
  deleteHome,
  sendRequestVerify
};
