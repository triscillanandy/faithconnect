import { FaHome,  FaPrayingHands, FaFilm, FaPlusSquare, FaCommentDots, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Pray from "./LoggedInScreenImages/Pray.png";
import { useCallback } from "react";

const LoggedInSideBar = () => {
  const navigate = useNavigate();

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:left-0 md:top-0 md:bottom-auto md:h-screen md:w-20 bg-white shadow-md z-50">
      {/* Logo for larger screens */}
      <div className="hidden md:flex md:flex-col items-center justify-center md:py-8">
        <img className="w-[100px] cursor-pointer" src={Pray} alt="Logo" />
      </div>

      {/* Menu Items */}
      <div className="flex md:flex-col items-center justify-around w-full md:gap-16 p-2 md:py-8">
        {/* Mobile View: Icons in a row */}
        <div className="flex md:flex-col items-center justify-around w-full md:gap-16">
          <FaHome
            className="cursor-pointer w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-900 transition-colors"
            title="Home"
            onClick={() => handleNavigation("/home")}
          />
      
          <FaPrayingHands
            className="hidden md:flex cursor-pointer w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-900 transition-colors"
            title="Pray"
            onClick={() => handleNavigation("/search")}
          />
          <FaFilm
            className="cursor-pointer w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-900 transition-colors"
            title="Reels"
            onClick={() => handleNavigation("/reels")}
          />
          <FaPlusSquare
            className="cursor-pointer w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-900 transition-colors"
            title="Create"
            onClick={() => handleNavigation("/post")}
          />
          <FaCommentDots
            className="cursor-pointer w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-900 transition-colors"
            title="Chats"
            onClick={() => handleNavigation("/chats")}
          />
          <FaBell
            className="hidden md:flex cursor-pointer w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-900 transition-colors"
            title="Notifications"
          />
          <FaUser
            className="cursor-pointer w-6 h-6 md:w-8 md:h-8 text-gray-600 hover:text-gray-900 transition-colors"
            title="Profile"
            onClick={() => handleNavigation("/user-profile")}
          />
        </div>
      </div>
    </nav>
  );
};

export default LoggedInSideBar;
