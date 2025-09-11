import axiosInstance from "./axiosInstance";



export interface AuthResponse {
  token: string;
  user: { id: number; username: string };
}


export const register = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await axiosInstance.post<AuthResponse>(`/auth/register`, { username, password });
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to register");
    }
  }
};


export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await axiosInstance.post<AuthResponse>(`/auth/login`, { username, password });
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to login");
    }
  }
};


export const logout = async (token: string): Promise<void> => {
  try {
    await axiosInstance.post(`/auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to logout");
    }
  }
};