import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useUserAuthStore = create((set) => ({
  userAuth: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  message: null,

  setUserAuth: (userAuth) => set({ userAuth }),

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const { data } = await axiosInstance.get("/users/check-auth");
      set({
        userAuth: data.userAuth,
        isAuthenticated: true,
      });
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
    } catch (error) {
      console.log(error);
      set({
        userAuth: null,
        isAuthenticated: false,
      });
      toast.error(error.response?.data?.error || "Error logging in");
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
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
      set({
        userAuth: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.get("/users/logout");
      set({
        userAuth: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
