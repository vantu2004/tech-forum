import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useUserFriendShip = create((set) => ({
  userFriendships: [],
  isLoading: false,

  fetchUserFriendships: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/users/friends/accepted");
      set({ userFriendships: data.friends });
    } catch (error) {
      set({ userFriendships: [] });
      throw new Error(
        error.response?.data?.error || "Error fetching user friendships"
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));
