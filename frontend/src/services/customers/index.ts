import { get, post } from './config';
import { ApiResponseType } from './types';

export const customersApi = {
  getCustomers: async () =>
    await get<ApiResponseType>('/api/customers'),
    createCustomer: async (data) =>
    await post<ApiResponseType>('/api/customers', data),
};
