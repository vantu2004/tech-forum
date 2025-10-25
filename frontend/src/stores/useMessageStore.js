import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { useUserAuthStore } from "./useUserAuthStore";

export const useMessageStore = create((set) => ({
  messages: [],
  isFetchLoading: false,
  isSendLoading: false,

  // --- Lấy tin nhắn theo conversation ---
  fetchMessages: async (conversationId) => {
    set({ isFetchLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${conversationId}`);
      set({ messages: res.data.messages || [] });
    } catch (error) {
      console.error(error);
      set({ messages: [] });
      throw new Error(error.response?.data?.error || "Error fetching messages");
    } finally {
      set({ isFetchLoading: false });
    }
  },

  // --- Gửi tin nhắn ---
  sendMessage: async (messageData) => {
    set({ isSendLoading: true });
    try {
      const res = await axiosInstance.post("/messages", messageData);
      const newMsg = res.data.newMessage;

      // UI phản hồi ngay (optimistic update)
      set((state) => {
        const exists = state.messages.some((m) => m._id === newMsg._id);
        if (exists) return state;
        return { messages: [...state.messages, newMsg] };
      });

      return newMsg;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error sending message");
    } finally {
      set({ isSendLoading: false });
    }
  },

  clearMessages: () => set({ messages: [] }),

  // --- Đăng ký realtime theo room ---
  subscribeToMessages: (conversationId) => {
    const socket = useUserAuthStore.getState().socket;
    if (!socket || !conversationId) return;

    // Khi mở khung chat: join room tương ứng
    socket.emit("joinConversation", conversationId);

    // Khi server phát "newMessage" cho room này
    socket.on("newMessage", (newMsg) => {
      if (newMsg.conversationId === conversationId) {
        set((state) => {
          const exists = state.messages.some((m) => m._id === newMsg._id);
          if (exists) return state; // tránh trùng
          return { messages: [...state.messages, newMsg] };
        });
      }
    });
  },

  // --- Hủy đăng ký realtime ---
  unsubscribeFromMessages: (conversationId) => {
    const socket = useUserAuthStore.getState().socket;
    if (!socket || !conversationId) return;

    // Khi đóng khung chat: rời room & tắt listener
    socket.emit("leaveConversation", conversationId);
    socket.off("newMessage");
  },
}));
