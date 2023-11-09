import { destroy, get, post } from './config';
import { ApiResponseType } from './types';

export const customersApi = {
  getCustomers: async () =>
    await get<ApiResponseType>('/api/customers'),
  createCustomer: async (data: any) =>
    await post<ApiResponseType>('/api/customers', data),
  deleteCustomer: async (id: string) =>
    await destroy<ApiResponseType>('/api/customers', id),
};
