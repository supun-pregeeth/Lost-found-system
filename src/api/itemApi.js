import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8089"
});

export const createItem = (data) => {
  return API.post("/api/items", data);
};

export const getItems = async () => {
  const res = await API.get("/api/items");
  return res.data;   // important
};