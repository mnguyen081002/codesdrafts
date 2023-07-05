import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = 'http://192.168.1.104:8080';

const ApiClient = axios.create({
  baseURL: API_URL,
});

ApiClient.interceptors.request.use(
  async (request) => {
    const session = await getSession();
    console.log('session', session);

    if (session) {
      request.headers!.Authorization = `Bearer ${session?.user}`;
    } else if (axios.defaults.headers.common.Authorization && request.headers) {
      request.headers.Authorization = axios.defaults.headers.common.Authorization;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default ApiClient;
