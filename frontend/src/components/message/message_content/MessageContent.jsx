import React, { useState } from "react";
import MessageContentSideBar from "./MessageContentSideBar.jsx";
import MessageContentChatWindow from "./MessageContentChatWindow.jsx";

const chats = [
  {
    id: 1,
    name: "Dummy User",
    title: "DSE-2 Engineer @Amazon",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "User 1",
    title: "Software Engineer Trainee",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 1,
    name: "Dummy User",
    title: "DSE-2 Engineer @Amazon",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "User 1",
    title: "Software Engineer Trainee",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 1,
    name: "Dummy User",
    title: "DSE-2 Engineer @Amazon",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "User 1",
    title: "Software Engineer Trainee",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 1,
    name: "Dummy User",
    title: "DSE-2 Engineer @Amazon",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "User 1",
    title: "Software Engineer Trainee",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
];

const MessageContent = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-md flex h-[650px] md:h-[595px] overflow-hidden border border-gray-100">
      <MessageContentSideBar
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        chats={chats}
      />

      <MessageContentChatWindow
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        chats={chats}
      />
    </div>
  );
};

export default MessageContent;
