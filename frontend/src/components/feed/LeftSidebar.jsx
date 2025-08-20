import logo from "../../assets/navbar/logo.png";

const LeftSidebar = () => {
  return (
    <div className="space-y-4 sticky top-20">
      {/* Card 1: Profile Info */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
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

      {/* Card 2: Analytics */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Profile viewers</span>
          <span className="text-blue-600 font-medium">23</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Post impressions</span>
          <span className="text-blue-600 font-medium">90</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
