import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useCommentStore = create((set) => ({
  comments: [],
  isLoading: false,

  fetchComments: async (postId) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(`/comments/${postId}`);
      set({ comments: data.comments });
    } catch (error) {
      set({ comments: [] });
      throw new Error(error.response?.data?.error || "Error fetching comments");
    } finally {
      set({ isLoading: false });
    }
  },

  createComment: async ({ postId, text, image, parentId }) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post("/comments", {
        postId,
        text,
        image,
        parentId,
      });
      return data.comment;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error creating comment");
    } finally {
      set({ isLoading: false });
    }
  },
}));
