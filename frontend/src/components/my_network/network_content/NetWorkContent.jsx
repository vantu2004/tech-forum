import Invite from "./Invite";
import FriendList from "./FriendList";
import InviteSent from "./InviteSent";
import { useUserFriendShipStore } from "./../../../stores/useUserFriendShipStore";
import { useEffect } from "react";

const NetWorkContent = ({
  setTotalSent,
  setTotalReceived,
  setTotalConnections,
}) => {
  const {
    fetchAcceptedFriends,
    fetchPeopleYouMayKnow,
    accepted,
    peopleYouMayKnow,
  } = useUserFriendShipStore();

  useEffect(() => {
    fetchAcceptedFriends();
    fetchPeopleYouMayKnow();
  }, [fetchAcceptedFriends, fetchPeopleYouMayKnow]);

  useEffect(() => {
    if (Array.isArray(accepted)) {
      setTotalConnections(accepted.length);
    }
  }, [accepted, setTotalConnections]);

  return (
    <main className="flex-1 space-y-6">
      <InviteSent setTotalSent={setTotalSent} />
      <Invite setTotalReceived={setTotalReceived} />

      <div className="space-y-6">
        {/* Danh sách Connections */}
        <FriendList title="Connections" friends={accepted} type="Disconnect" />

        {/* Danh sách People you may know */}
        <FriendList
          title="People you may know"
          friends={peopleYouMayKnow}
          type="Connect"
        />
      </div>
    </main>
  );
};

export default NetWorkContent;
