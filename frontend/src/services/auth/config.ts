import axios, { AxiosError } from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL;

const exampleApi = axios.create({
  baseURL: `${apiUrl}`,
});

exampleApi.interceptors.request.use(
  (config) => {
    return {
      ...config,
    };
  },
  (error) => Promise.reject(error),
);

exampleApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const { get, post, put, delete: destroy } = exampleApi;
export { destroy, get, post, put };

