const LeftSidebar = () => {
  return (
    <aside className="hidden md:block w-1/4 bg-white rounded-lg shadow-sm p-4 self-start sticky top-20 text-black">
      <h2 className="font-semibold mb-3">Network overview</h2>
      <ul className="text-sm text-gray-600 space-y-2">
        <li>Invites sent: 0</li>
        <li>Connections: 0</li>
        <li>Newsletters: 0</li>
      </ul>
    </aside>
  );
};

export default LeftSidebar;
