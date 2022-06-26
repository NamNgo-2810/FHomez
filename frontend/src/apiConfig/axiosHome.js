import axios from "axios";


const axiosHome = axios.create({
    baseURL: "http://localhost:5001/api/home/",
    headers: {
        "Content-Type": "application/json",
        "x_authorization": localStorage.jwt
    },
});

// Add a request interceptor
axiosHome.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosHome.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default axiosHome;
