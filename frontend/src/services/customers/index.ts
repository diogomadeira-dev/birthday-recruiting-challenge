import { get, post } from './config';
import { ApiResponseType } from './types';

export const customersApi = {
  getCustomers: async () =>
    await get<ApiResponseType>('/api/customers'),
  crateCustomer: async ({data, accessToken}) =>
    await post<ApiResponseType>('/api/customers', data),
};
