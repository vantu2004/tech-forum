import logo from "../../../assets/navbar/logo.png";

const FriendCard = ({ friend, buttonLabel }) => {
  return (
    <div className="relative border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Cover image */}
      <div className="w-full h-20 bg-gray-200">
        <img
          src={friend.cover}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-4 pb-4 -mt-10 flex-1">
        <img
          src={friend.avatar}
          alt={friend.name}
          className="w-20 h-20 rounded-full border-2 border-white object-cover mb-2"
        />

        <p className="font-medium">{friend.name}</p>
        <p className="text-sm text-gray-600 mb-2">{friend.title}</p>

        <div className="flex items-center justify-center gap-1 mb-3">
          <img src={logo} alt="school" className="w-4 h-4" />
          <span className="text-xs text-gray-500">{friend.school}</span>
        </div>

        {/* Button sát lề dưới */}
        <button className="mt-auto w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 rounded-full py-1.5 text-sm font-medium hover:bg-blue-50">
          <span>{buttonLabel}</span>
        </button>
      </div>
    </div>
  );
};

const FriendList = ({ title, friends, buttonLabel }) => {
  return (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {friends.map((f, idx) => (
          <FriendCard key={idx} friend={f} buttonLabel={buttonLabel} />
        ))}
      </div>
    </section>
  );
};

export default FriendList;
