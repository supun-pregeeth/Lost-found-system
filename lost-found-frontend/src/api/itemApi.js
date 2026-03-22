import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8088"
});

//ADD token every request api
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
  //res is like {
  //data: [ ... ],        // 👈 YOUR ACTUAL DATA
  //status: 200,
  //statusText: "OK",
  //headers: {},
  //config: {}}

  return res.data; // the json sent by backend
};


//explain config.

/* API.post("/items", {
  name: "Wallet",
  category: "Accessories"
});

const config = {
  method: "get",
  url: "/api/items",
  headers: {
    Authorization: "Bearer token"
  },
  baseURL: "http://localhost:8080"
}; */