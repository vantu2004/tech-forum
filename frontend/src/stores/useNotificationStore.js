import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  // Lấy toàn bộ thông báo
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/notifications");
      set({
        notifications: data.notifications || [],
        unreadCount: data.notifications?.filter((n) => !n.isRead).length || 0,
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      set({ notifications: [], unreadCount: 0 });
      throw new Error(
        error.response?.data?.error || "Error fetching notifications"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  // Lấy danh sách chưa đọc
  fetchUnreadNotifications: async () => {
    try {
      const { data } = await axiosInstance.get("/notifications/unread");
      set({
        notifications: data.notifications || [],
        unreadCount: data.notifications?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  },

  // 🔹 Đánh dấu thông báo đã đọc
  markAsRead: async (notificationId) => {
    try {
      const { data } = await axiosInstance.put("/notifications/mark-as-read", {
        notificationId,
      });

      if (data.success) {
        // Cập nhật lại state local
        set((state) => {
          const updated = state.notifications.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n
          );
          const unreadCount = updated.filter((n) => !n.isRead).length;
          return { notifications: updated, unreadCount };
        });
      }

      return data.notification;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw new Error(
        error.response?.data?.error || "Error marking notification"
      );
    }
  },

  // Đánh dấu tất cả là đã đọc (nếu cần)
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },
}));
