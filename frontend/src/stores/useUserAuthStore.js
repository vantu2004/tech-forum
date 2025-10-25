import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

export const useUserAuthStore = create((set, get) => ({
  userAuth: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  socket: null,

  onlineUsers: [],

  // dùng cho useGoogleAuth hook
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  setUserAuth: (userAuth) => set({ userAuth }),

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const { data } = await axiosInstance.get("/users/check-auth");
      set({
        userAuth: data.userAuth,
        isAuthenticated: true,
      });

      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({
        userAuth: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      set({
        userAuth: data.userAuth,
        isAuthenticated: true,
      });

      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({
        userAuth: null,
        isAuthenticated: false,
      });
      throw new Error(error.response?.data?.error || "Error logging in user");
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post("/users/register", {
        email,
        password,
        name,
      });
      set({
        userAuth: data.userAuth,
      });
    } catch (error) {
      console.log(error);
      set({
        userAuth: null,
      });
      throw new Error(error.response?.data?.error || "Error registering user");
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (email, OTP) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post("/users/verify-email", {
        email,
        OTP,
      });
      if (data.userAuth) {
        set({
          userAuth: data.userAuth,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.log(error);
      set({
        userAuth: null,
        isAuthenticated: false,
      });
      throw new Error(error.response?.data?.error || "Error verifying email");
    } finally {
      set({ isLoading: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post("/users/forgot-password", {
        email,
      });
      set({
        message: data.message,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.error || "Error forgot password");
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (token, newPassword) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post(
        `/users/reset-password/${token}`,
        {
          password: newPassword,
        }
      );
      set({
        message: data.message,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.error || "Error reset password");
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/users/logout");
      set({
        userAuth: null,
        isAuthenticated: false,
      });

      get().disconnectSocket();
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error logging out user");
    } finally {
      set({ isLoading: false });
    }
  },

  connectSocket: () => {
    if (!get().userAuth || get().socket?.connected) {
      return;
    }
    const socketInstance = io(BASE_URL, {
      query: {
        userId: get().userAuth._id,
      },
    });
    socketInstance.connect();

    set({ socket: socketInstance });

    socketInstance.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
