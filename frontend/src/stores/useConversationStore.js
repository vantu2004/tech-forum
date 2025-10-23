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

  createConversation: async (receiverId, message) => {
    try {
      if (!message) return;
      await axiosInstance.post("/conversations", {
        receiverId,
        message,
      });
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  },
}));
