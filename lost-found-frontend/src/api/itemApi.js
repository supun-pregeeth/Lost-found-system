import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8088"
});

// 🔥 ADD THIS INTERCEPTOR
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const createItem = (data) => {
  return API.post("/api/items", data);
};

export const getItems = async () => {
  const res = await API.get("/api/items");
  return res.data;
};