import axios, { AxiosError } from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL;

const customersApi = axios.create({
  baseURL: `${apiUrl}`,
});


customersApi.interceptors.request.use(
  (config) => {
    // Assuming you have the accessToken stored in localStorage
    const auth = JSON.parse(localStorage.getItem('persist:root')).auth

    const accessToken = JSON.parse(auth).accessToken

    console.log('accessToken', accessToken)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

customersApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const { get, post, put, delete: destroy } = customersApi;
export { destroy, get, post, put };

