import { CrteateUser } from '../interface/global';
import axiosClient from './axiosClient';

const authApi = {
  login: (params: CrteateUser) =>
    axiosClient.post('/auth/login', params, { withCredentials: true }),
  checkAuth: () =>
    axiosClient.get('/auth/checkAuth', { withCredentials: true }),
  logout: () => axiosClient.get('/auth/logout', { withCredentials: true }),
  signup: (params: CrteateUser) =>
    axiosClient.post('auth/signup', params, { withCredentials: true }),
};

export default authApi;
