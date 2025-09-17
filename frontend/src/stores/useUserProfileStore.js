import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useUserProfileStore = create((set) => ({
  userProfile: null,
  isLoading: false,

  fetchUserProfile: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/users/profile");
      set({ userProfile: data.userProfile });
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Error fetching user profile"
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));
