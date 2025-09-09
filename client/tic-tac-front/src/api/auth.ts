import axiosInstance from "./axiosInstance";



export interface AuthResponse {
  token: string;
  user: { id: number; username: string };
}


export const register = async (username: string, password: string): Promise<AuthResponse> => {
  const res = await axiosInstance.post(`/auth/register`, { username, password });
  return res.data;
};


export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const res = await axiosInstance.post(`/auth/login`, { username, password });
  return res.data;
};


export const logout = async (token: string): Promise<void> => {
  await axiosInstance.post(`/auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
};