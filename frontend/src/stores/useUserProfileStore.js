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

  uploadResume: async (file) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      formData.append("resumeFile", file);

      const { data } = await axiosInstance.post(
        "/users/profile/resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // cập nhật lại userProfile sau khi upload
      set((state) => ({
        userProfile: {
          ...state.userProfile,
          resume: data.userProfile.resume, // backend trả về resume mới
        },
      }));
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.error || "Error uploading resume"
      );
    } finally {
      set({ isLoading: false });
    }
  }
}));
