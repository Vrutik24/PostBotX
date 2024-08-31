import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5290/api/Test",
  headers: {
    "Content-Type": "application/json",
  },
});



export default apiClient;
