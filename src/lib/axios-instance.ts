import axios from "axios";
// Create an axios instance to reuse the same base URL and headers for every request
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});