import { FaHome, FaSearch, FaPrayingHands, FaFilm, FaPlusSquare, FaCommentDots, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "./LoggedInScreenImages/Logo.png";
import { useCallback } from "react";

const LoggedInSideBar = ({ showSideBar = true }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return (
    <>
      {showSideBar && (
        <>
          {/* Sidebar for larger screens (hidden on mobile) */}
          <nav className="hidden md:flex flex-col items-center w-20 h-screen bg-white shadow-md py-8 px-4 fixed">
            <div className="mb-12">
              <img className="w-[40px] cursor-pointer" src={Logo} alt="Logo" />
            </div>
            <div className="flex flex-col items-center gap-12">
              <FaHome className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Home" onClick={() => handleNavigation("/home")} />
              <FaSearch className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Search" onClick={() => handleNavigation("/search")} />
              <FaPrayingHands className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Pray" onClick={() => handleNavigation("/search")} />
              <FaFilm className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Reels" onClick={() => handleNavigation("/reels")} />
              <FaPlusSquare className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="DM" onClick={() => handleNavigation("/post")} />
              <FaCommentDots className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="DM" onClick={() => handleNavigation("/chats")} />
              <FaBell className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Notification" />
              <FaUser className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Account" onClick={() => handleNavigation("/user-profile")} />
            </div>
          </nav>

          {/* Bottom navigation bar for mobile screens (hidden on larger screens) */}
          {/* <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-white shadow-lg flex justify-around items-center z-50">
            <FaHome className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500" title="Home" onClick={() => handleNavigation("/home")} />
            <FaSearch className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500" title="Search"  onClick={() => handleNavigation("/search")}/>
            <FaPrayingHands className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500" title="Pray" onClick={() => handleNavigation("/search")} />
            <FaFilm className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500" title="Reels" onClick={() => handleNavigation("/reels")} />
            <FaPlusSquare className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500" title="DM" onClick={() => handleNavigation("/post")} />
            <FaCommentDots className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500" title="DM" onClick={() => handleNavigation("/chats")} />
            <FaBell className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500" title="Notification" />
            <FaUser className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500" title="Account" onClick={() => handleNavigation("/user-profile")} />
          </nav> */}
        </>
      )}
    </>
  );
};

export default LoggedInSideBar;