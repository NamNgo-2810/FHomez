import axios from "axios";
import queryString from "query-string";

const getToken = () => localStorage.jwt ? localStorage.jwt : null


const axiosAdmin = axios.create({
    baseURL: "http://localhost:8001/api/admin/",
    headers: {
        "Content-Type": "application/json"
    },
    paramsSerializer: (params) => queryString.stringify(params)
});


// Add a request interceptor
axiosAdmin.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        config.headers.x_authorization = getToken();
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosAdmin.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default axiosAdmin;
