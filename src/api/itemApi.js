import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8089"
});

export const createItem = (data) => {
  return API.post("/api/items", data);
};

export const getAllItems = () => {
  return API.get("/api/items");
};