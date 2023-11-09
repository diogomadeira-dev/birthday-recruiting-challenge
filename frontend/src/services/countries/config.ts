import axios, { AxiosError } from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL;

const countriesApi = axios.create({
  baseURL: `${apiUrl}`,
});


countriesApi.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem('persist:root')).auth
    const accessToken = JSON.parse(auth).accessToken

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

countriesApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const { get, post, put, delete: destroy } = countriesApi;
export { destroy, get, post, put };

