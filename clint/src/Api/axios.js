import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  //baseURL: '',
  withCredentials: true,
  headers: {
    token: localStorage.getItem('token'),
  },
});

export default instance;