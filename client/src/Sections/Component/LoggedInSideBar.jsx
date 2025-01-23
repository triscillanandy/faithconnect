import { FaHome, FaSearch, FaPrayingHands, FaFilm, FaPlusSquare, FaCommentDots, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Pray from "./LoggedInScreenImages/Pray.png";
import { useCallback } from "react";

const LoggedInSideBar = () => {
  const navigate = useNavigate();

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return (
    <nav className="flex flex-col md:flex-row md:h-screen md:w-20 bg-blue-500 shadow-md fixed md:items-center md:py-8 md:px-4 z-50">

      {/* Logo for larger screens */}
  
      <div className="flex md:flex-col items-center justify-around w-full md:gap-10">
      <img className="w-[60px] cursor-pointer" src={Pray} alt="Logo" />
      </div>

      {/* Menu Items */}
      <div className="flex md:flex-col items-center justify-around w-full md:gap-10">
        <FaHome
          className="cursor-pointer w-6 h-6 md:h-7 text-gray-600 hover:text-blue-500"
          title="Home"
          onClick={() => handleNavigation("/home")}
        />
        <FaSearch
          className="cursor-pointer w-6 h-6 md:h-7 text-gray-600 hover:text-blue-500"
          title="Search"
          onClick={() => handleNavigation("/search")}
        />
        <FaPrayingHands
          className="cursor-pointer w-6 h-6 md:h-7 text-gray-600 hover:text-blue-500"
          title="Pray"
          onClick={() => handleNavigation("/pray")}
        />
        <FaFilm
          className="cursor-pointer w-6 h-6 md:h-7 text-gray-600 hover:text-blue-500"
          title="Reels"
          onClick={() => handleNavigation("/reels")}
        />
        <FaPlusSquare
          className="cursor-pointer w-6 h-6 md:h-7 text-gray-600 hover:text-blue-500"
          title="Create"
          onClick={() => handleNavigation("/post")}
        />
        <FaCommentDots
          className="cursor-pointer w-6 h-6 md:h-7 text-gray-600 hover:text-blue-500"
          title="Chats"
          onClick={() => handleNavigation("/chats")}
        />
        <FaBell
          className="cursor-pointer w-6 h-6 md:h-7 text-gray-600 hover:text-blue-500"
          title="Notifications"
        />
        <FaUser
          className="cursor-pointer w-6 h-6 md:h-7 text-gray-600 hover:text-blue-500"
          title="Profile"
          onClick={() => handleNavigation("/user-profile")}
        />
      </div>
    </nav>
  );
};

export default LoggedInSideBar;
