import axios from 'axios';

export const axiosAuthInstance = axios.create({
  baseURL: "http://localhost:8083/api/auth",//`${process.env.REACT_APP_AUTH_URL}`
});
