import logo from "../../assets/navbar/logo.png";

const ProfileInfoCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
      <div className="h-20 bg-gray-200 rounded-t-lg"></div>
      <div className="flex flex-col items-center -mt-10">
        <img
          src={logo}
          alt="User"
          className="w-20 h-20 rounded-full border-2 border-white"
        />
        <h2 className="font-semibold text-gray-800 mt-2">Dummy User</h2>
        <p className="text-sm text-gray-500">Software Engineer @Amazon</p>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
