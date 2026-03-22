import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8088/api', // Spring Boot port
});

//add token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`; //Add token to header(like i have the token,so allow me)
    }
    return req; //req object(it could be url,method,data like request)
});

export const getMyReports = () => API.get("/reports/my");
export const getMatches = () => API.get("/matches");
export const getMessages = () => API.get("/messages");
export const getStats = () => API.get("/dashboard/stats");
