import axios from 'axios';

const API_URL = 'https://codesmooth-api-production.up.railway.app';

const ApiClient = () => {
  const instance = axios.create({
    baseURL: API_URL,
  });

  return instance;
};

export default ApiClient();
