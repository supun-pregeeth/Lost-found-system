import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8089", // Spring Boot port
});

export const registerUser = (data) => {
  return API.post("/api/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/api/auth/login", data);
};