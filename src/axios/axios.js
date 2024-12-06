import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://contract-node-yfrjk.ondigitalocean.app/",
  withCredentials: true,
});
// export const url = "http://localhost:5000";
export const url = "https://contract-node-yfrjk.ondigitalocean.app/";
