import axios from 'axios';

export const axiosAuthInstance = axios.create({
  baseURL: "http://localhost:8084/api/auth",//`${process.env.REACT_APP_AUTH_URL}`
});

export const axiosAdminInstance = axios.create({
  baseURL: "http://localhost:8084/api/admin",
})

export const axiosProductInstance = axios.create({
  baseURL: "http://localhost:8084/api/products",
})
