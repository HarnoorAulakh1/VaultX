import axios from "axios";

const url=import.meta.env.VITE_PRODUCTION || "http://localhost:8000";

export const api = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
