import { FaBell, FaSearch } from "react-icons/fa";

const TopSideBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-3 flex items-center justify-between z-50 md:hidden">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 w-full">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 bg-transparent outline-none w-full"
        />
      </div>

      {/* Notifications Icon */}
      <FaBell className="text-gray-600 w-6 h-6 cursor-pointer ml-3" />
    </div>
  );
};

export default TopSideBar;
