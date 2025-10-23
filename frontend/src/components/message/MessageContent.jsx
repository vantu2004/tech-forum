import { useEffect, useState } from "react";
import SideBar from "./SideBar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { useConversationStore } from "../../stores/useConversationStore.js";
import { useUserFriendShipStore } from "../../stores/useUserFriendShipStore.js";

const MessageContent = () => {
  const { fetchConversations } = useConversationStore();
  const { fetchAcceptedFriends } = useUserFriendShipStore();

  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    fetchConversations();
    fetchAcceptedFriends();
  }, [fetchConversations, fetchAcceptedFriends]);

  return (
    <div className="bg-white rounded-lg shadow-md flex h-[80vh] md:h-[80vh] overflow-hidden border border-gray-100">
      <SideBar activeChat={activeChat} setActiveChat={setActiveChat} />

      <ChatWindow activeChat={activeChat} setActiveChat={setActiveChat} />
    </div>
  );
};

export default MessageContent;
