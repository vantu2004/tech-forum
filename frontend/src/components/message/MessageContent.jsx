import { useState } from "react";
import SideBar from "./SideBar.jsx";
import ChatWindow from "./ChatWindow.jsx";

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
      <SideBar
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        chats={chats}
      />

      <ChatWindow
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        chats={chats}
      />
    </div>
  );
};

export default MessageContent;
