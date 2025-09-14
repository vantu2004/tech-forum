import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const usePostStore = create((set) => ({
  posts: [],
  isLoading: false,

  setPosts: (posts) => set({ posts }),

  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/posts");
      set({ posts: data.posts });
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error fetching posts");
    } finally {
      set({ isLoading: false });
    }
  },
}));
