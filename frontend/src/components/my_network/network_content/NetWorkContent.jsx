import Invite from "./Invite";
import FriendList from "./FriendList";
import logo from "../../../assets/navbar/logo.png";

const NetWorkContent = () => {
  const friends = [
    {
      name: "Hùng Lê Công",
      title: "Student at HCMC University of Technology...",
      school: "HCMC University of Technology and Education",
      avatar: logo,
      cover: logo,
    },
    {
      name: "Thu Thảo Võ Thị",
      title: "Student at HCMC University of Technology...",
      school: "HCMC University of Technology and Education",
      avatar: logo,
      cover: logo,
    },
  ];

  return (
    <main className="flex-1 space-y-6">
      <Invite />

      <div className="space-y-6">
        {/* Danh sách Connections */}
        <FriendList
          title="Connections"
          friends={friends}
          buttonLabel="- Disconnect"
        />

        {/* Danh sách People you may know */}
        <FriendList
          title="People you may know"
          friends={friends}
          buttonLabel="+ Connect"
        />
      </div>
    </main>
  );
};

export default NetWorkContent;
