import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useCommentStore = create((set) => ({
  commentsByPost: {}, // { [postId]: [comments...] }
  loadingByPost: {}, // { [postId]: true/false }
  paginationByPost: {}, // { [postId]: {...} }

  getCommentsPaginated: async (
    postId,
    page = 1,
    limit = 5,
    parentId = null
  ) => {
    // set loading cho post cụ thể
    set((state) => ({
      loadingByPost: { ...state.loadingByPost, [postId]: true },
    }));
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
        paginationByPost: {
          ...state.paginationByPost,
          [postId]: data.pagination,
        },
      }));
    } finally {
      // clear loading cho post cụ thể
      set((state) => ({
        loadingByPost: { ...state.loadingByPost, [postId]: false },
      }));
    }
  },

  createComment: async ({ postId, text, image, parentId }) => {
    set((state) => ({
      loadingByPost: { ...state.loadingByPost, [postId]: true },
    }));
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
      set((state) => ({
        loadingByPost: { ...state.loadingByPost, [postId]: false },
      }));
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
