import axios from 'axios';

const API_URL = "http://192.168.1.41:8080";

// axios.defaults.baseURL = API_URL;
// axios.interceptors.request.use(
//   // eslint-disable-next-line func-names
//   (config) => {
//     // if (config.headers) {
//     //   config.headers["Accept-Language"] = "en"; // vn - en
//     // }
//     return config;
//   },
//   // eslint-disable-next-line func-names
//   (error) => {
//     return Promise.reject(error);
//   },
// );


const ApiClient = () => {
   const instance = axios.create({
      baseURL: API_URL,
   });

   return instance;
};

export default ApiClient();
