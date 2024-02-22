import axios from "axios";
// Create an axios instance to reuse the same base URL and headers for every request
export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});