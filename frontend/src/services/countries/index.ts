import { get, post } from './config';
import { ApiResponseType } from './types';

export const countriesApi = {
  getCountries: async () =>
    await get<ApiResponseType>('/api/countries'),
    createCountry: async (data) =>
    await post<ApiResponseType>('/api/countries', data),
};
