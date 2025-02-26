//import http from "../../http-common";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/staff");
};

const get = id => {
  return http.get(`/staff/${id}`);
};

const create = data => {
  return http.post("/staff", data);
};

const update = (id, data) => {
  return http.put(`/staff/${id}`, data);
};

const remove = id => {
  return http.delete(`/staff/${id}`);
};


const StaffService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default StaffService;