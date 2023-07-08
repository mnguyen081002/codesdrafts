import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.104:8080';

const ApiClient = axios.create({
  baseURL: API_URL,
});

ApiClient.interceptors.request.use(
  async (request) => {
    // TODO: set type for session
    const session: any = await getSession();
    if (session) {
      request.headers!.Authorization = `Bearer ${session.token.user.accessToken}`;
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
