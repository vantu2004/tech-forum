import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useUserExperienceStore = create((set) => ({
  userExperience: null,
  userExperiences: [],
  isLoading: false,

  fetchUserExperience: async (experienceId) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/users/experiences/${experienceId}`
      );
      set({ userExperience: data.experience });
    } catch (error) {
      set({ userExperience: null });
      throw new Error(
        error.response?.data?.error || "Error fetching user experiences"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserExperiences: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/users/experiences");
      set({ userExperiences: data.experiences });
    } catch (error) {
      set({ userExperiences: [] });
      throw new Error(
        error.response?.data?.error || "Error fetching user experiences"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  createExperience: async (experience) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post(
        "/users/experiences",
        experience
      );
      set((state) => ({
        userExperiences: [...state.userExperiences, data.experience],
      }));
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error adding experience");
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserExperience: async (id, updates) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.put(
        `/users/experiences/${id}`,
        updates
      );
      set((state) => ({
        userExperiences: state.userExperiences.map((exp) =>
          exp._id === data.experience._id ? data.experience : exp
        ),
      }));
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Error updating user experience"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUserExperience: async (id) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/users/experiences/${id}`);
      set((state) => ({
        userExperiences: state.userExperiences.filter((exp) => exp._id !== id),
      }));
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Error deleting user experience"
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));
