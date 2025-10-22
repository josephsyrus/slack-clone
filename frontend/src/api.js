import axios from "axios";

//creating the axios instance, which need not be repeated anywhere else
const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

//interceptors are functions that run prior to sending the request
api.interceptors.request.use(
  //config is object representing HTTP request, token is jwt
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      //adds this to HTTP header, which containts the jwt
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  //error handler for interceptor
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
