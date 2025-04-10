import axios from 'axios';

const apiTP = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default apiTP;