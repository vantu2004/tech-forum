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

  updateProfile: async (updateData) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.put("/users/profile", updateData);
      set({ userProfile: data.userProfile });
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Error updating user profile"
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));
