import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useUserSkillStore = create((set) => ({
  userSkills: [],
  isLoading: false,

  fetchUserSkills: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/users/skills");
      set({ userSkills: data.skills });
    } catch (error) {
      set({ userSkills: [] });
      throw new Error(
        error.response?.data?.error || "Error fetching user skills"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserSkills: async (skills) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.put("/users/skills", { skills });
      set({ userSkills: data.skills });
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Error updating user skills"
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));
