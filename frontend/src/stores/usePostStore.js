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
      set({ posts: [] });
      throw new Error(error.response?.data?.error || "Error fetching posts");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPostsByUserId: async (userId) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(`/posts/user/${userId}`);
      set({ posts: data.posts });
    } catch (error) {
      set({ posts: [] });
      throw new Error(error.response?.data?.error || "Error fetching posts");
    } finally {
      set({ isLoading: false });
    }
  },

  createPost: async (post) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post("/posts", {
        desc: post.desc,
        images: post.images,
      });
      set((state) => {
        const newPosts = [data.post, ...state.posts];
        // đảm bảo sort giảm dần theo createdAt
        newPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return { posts: newPosts };
      });
      return data.post;
    } catch (error) {
      set({ posts: [] });
      throw new Error(error.response?.data?.error || "Error creating post");
    } finally {
      set({ isLoading: false });
    }
  },

  likePost: async (postId) => {
    try {
      await axiosInstance.post("/posts/like-dislike", {
        postId,
      });
    } catch (error) {
      set({ posts: [] });
      console.error("Error liking post", error);
    }
  },

  getPostsByUser: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/posts/owner");
      set({ posts: data.posts });
    } catch (error) {
      set({ posts: [] });
      throw new Error(
        error.response?.data?.error || "Error fetching user's posts"
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));
