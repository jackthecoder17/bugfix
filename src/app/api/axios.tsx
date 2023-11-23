import axios from "axios";

export const ApiManager = axios.create({
  baseURL: "http://localhost:8070/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
