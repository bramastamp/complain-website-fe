import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ganti sesuai URL backend
});

export default api;