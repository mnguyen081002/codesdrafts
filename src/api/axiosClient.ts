import axios from 'axios';

const API_URL = '192.168.1.104:8080/';

const ApiClient = () => {
  const instance = axios.create({
    baseURL: API_URL,
  });

  return instance;
};

export default ApiClient();
