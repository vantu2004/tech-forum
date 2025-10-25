import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { useUserAuthStore } from "./useUserAuthStore";

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
      const { data } = await axiosInstance.post("/conversations", {
        receiverId,
        message,
      });

      if (data.success && data.conversation) {
        set((state) => ({
          conversations: [data.conversation, ...state.conversations],
        }));
      }

      return data.conversation;
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  },

  // Bắt realtime cập nhật lastMessage
  subscribeToConversationUpdates: () => {
    const socket = useUserAuthStore.getState().socket;
    if (!socket) return;

    socket.on("conversationUpdated", (updatedConversation) => {
      set((state) => {
        const exists = state.conversations.some(
          (c) => c._id === updatedConversation._id
        );

        if (exists) {
          // cập nhật lại lastMessage & updatedAt
          const newConvos = state.conversations.map((c) =>
            c._id === updatedConversation._id ? updatedConversation : c
          );
          // sắp xếp lại: đẩy convo vừa có message lên đầu
          // newConvos.sort(
          //   (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          // );

          return { conversations: newConvos };
        } else {
          // nếu chưa có thì thêm mới
          return {
            conversations: [updatedConversation, ...state.conversations],
          };
        }
      });
    });
  },

  unsubscribeFromConversationUpdates: () => {
    const socket = useUserAuthStore.getState().socket;
    if (socket) socket.off("conversationUpdated");
  },
}));
