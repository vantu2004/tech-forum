import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useConversationStore = create((set) => ({
  conversations: [],
  isLoading: false,

  fetchConversations: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/conversations");
      set({ conversations: data.conversations });
    } catch (error) {
      console.error(error);
      set({ conversations: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
