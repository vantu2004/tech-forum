import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useCommentStore = create((set) => ({
  comments: [],
  isLoading: false,

  commentsByPost: {}, // { [postId]: [comments...] }

  getCommentsPaginated: async (
    postId,
    page = 1,
    limit = 5,
    parentId = null
  ) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/comments/pagination/${postId}`,
        {
          params: { page, limit, parentId },
        }
      );

      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]:
            page === 1
              ? data.comments
              : [...(state.commentsByPost[postId] || []), ...data.comments],
        },
        pagination: data.pagination,
      }));
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

      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: [data.comment, ...(state.commentsByPost[postId] || [])],
        },
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  likeDislikeComment: async (commentId) => {
    try {
      await axiosInstance.put("/comments/like-dislike", { commentId });
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error liking comment");
    }
  },
}));
