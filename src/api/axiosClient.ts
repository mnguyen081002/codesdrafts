import axios from 'axios';

const API_URL = "http://192.168.1.41:8080";

const ApiClient = () => {
   const instance = axios.create({
      baseURL: API_URL,
   });

   return instance;
};

export default ApiClient();
