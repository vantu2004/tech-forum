import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useMessageStore = create((set) => ({
  messages: [],
  isFetchLoading: false,
  isSendLoading: false,

  fetchMessages: async (conversationId) => {
    set({ isFetchLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${conversationId}`);

      // API trả về { success, messages }
      set({ messages: response.data.messages || [] });
    } catch (error) {
      console.error(error);
      set({ messages: [] });
      throw new Error(error.response?.data?.error || "Error fetching messages");
    } finally {
      set({ isFetchLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    set({ isSendLoading: true });
    try {
      const response = await axiosInstance.post("/messages", messageData);
      const newMessage = response.data.newMessage;

      // Cập nhật UI ngay
      set((state) => ({ messages: [...state.messages, newMessage] }));

      return newMessage;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error sending message");
    } finally {
      set({ isSendLoading: false });
    }
  },

  clearMessages: () => set({ messages: [] }),
}));
