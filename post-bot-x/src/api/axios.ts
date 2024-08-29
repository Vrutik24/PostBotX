import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:44373/api/Test",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
