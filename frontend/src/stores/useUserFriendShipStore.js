import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useUserFriendShipStore = create((set, get) => ({
  accepted: [],
  pendingSent: { list: [], total: 0, page: 1, totalPages: 1 },
  pendingReceived: { list: [], page: 1, totalPages: 1 },
  peopleYouMayKnow: [],
  isLoading: false,

  // ---- FETCH FUNCTIONS ----
  fetchAcceptedFriends: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/users/friends/accepted");
      set({ accepted: data.friends || [] });
    } catch (error) {
      set({ accepted: [] });
      throw new Error(
        error.response?.data?.error || "Error fetching user friendships"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPendingSent: async (page = 1) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/users/friends/pending-sent?page=${page}`
      );
      set({
        pendingSent: {
          list: data.friendships || [],
          total: data.total || 0,
          page: data.page || page,
          totalPages: data.totalPages || 1,
        },
      });
    } catch (error) {
      console.error(error);
      set({ pendingSent: { list: [], page: 1, totalPages: 1 } });
      throw new Error(
        error.response?.data?.error || "Error fetching sent requests"
      );
    } finally {
      set({ isLoading: false });
    }
  },
  fetchPendingReceived: async (page = 1) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get(
        `/users/friends/pending-received?page=${page}`
      );
      set({
        pendingReceived: {
          list: data.friendships || [],
          total: data.total || 0,
          page: data.page || page,
          totalPages: data.totalPages || 1,
        },
      });
    } catch (error) {
      console.error(error);
      set({ pendingReceived: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPeopleYouMayKnow: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/users/friends/related");
      set({ peopleYouMayKnow: data.filteredSuggestions || [] });
    } catch (error) {
      console.error(error);
      set({ peopleYouMayKnow: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  // ---- ACTION FUNCTIONS ----
  sendFriendRequest: async (receiverId) => {
    try {
      const { data } = await axiosInstance.post("/users/friends/add", {
        receiver: receiverId,
      });
      // Cập nhật lại danh sách pendingSent
      await get().fetchPendingSent();
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Error sending friend request"
      );
    }
  },

  cancelFriendRequest: async (friendshipId) => {
    try {
      const { data } = await axiosInstance.delete("/users/friends/cancel", {
        data: { friendshipId },
      });

      // Cập nhật lại danh sách pendingSent và peopleYouMayKnow
      await get().fetchPendingSent();
      await get().fetchPeopleYouMayKnow();
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Error canceling friend request"
      );
    }
  },

  acceptFriendRequest: async (friendshipId) => {
    try {
      const { data } = await axiosInstance.post("/users/friends/accept", {
        friendshipId,
      });
      // Cập nhật lại danh sách
      await Promise.all([
        get().fetchAcceptedFriends(),
        get().fetchPendingReceived(),
      ]);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error accepting request");
    }
  },

  declineFriendRequest: async (friendshipId) => {
    try {
      const { data } = await axiosInstance.delete("/users/friends/decline", {
        data: {friendshipId}, // DELETE request body phải nằm trong trường data
      });
      await get().fetchPendingReceived();
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error declining request");
    }
  },

  removeFriendship: async (friendshipId) => {
    try {
      const { data } = await axiosInstance.delete("/users/friends/remove", {
        data: {friendshipId}, // DELETE request body phải nằm trong trường data
      });
      await get().fetchAcceptedFriends();
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error removing friend");
    }
  },
}));
