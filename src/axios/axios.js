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
export const axiosUserInstance = axios.create({
  baseURL: "http://localhost:8084/api/user",
})
export const axiosCountriesCitiesStateInstance = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1",
})
export const axiosOrderInstance = axios.create({
  baseURL: "http://localhost:8084/api/order",
})


