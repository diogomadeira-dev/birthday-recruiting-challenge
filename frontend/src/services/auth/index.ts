import { get, post } from './config';
import { ApiResponseType } from './types';

export const authApi = {
  login: async (data: { username: string; password: string } ) =>
    await post<ApiResponseType>('/api/auth/login', data),
  profile: async () => await get<ApiResponseType>('/api/profile'),
};
