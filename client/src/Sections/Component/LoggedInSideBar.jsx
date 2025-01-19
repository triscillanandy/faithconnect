import { FaHome, FaSearch, FaPrayingHands, FaFilm, FaEnvelope, FaBell, FaUser } from "react-icons/fa";
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
        <div
          className="h-[825px] bg-[#180F4B] flex flex-col justify-between max-[833px]:flex-row max-[833px]:h-[45px] max-[833px]:items-center max-[833px]:w-390px relative max-[833px]:bottom-0 max-[833px]:px-3 max-[833px]:py-2"
        >
          <nav className="bg-white shadow-md py-8 px-4 flex flex-col items-center w-20 fixed h-full">
            <div className="mb-12">
              <img className="w-[40px] cursor-pointer" src={Logo} alt="Logo" />
            </div>
            <div className="flex flex-col items-center gap-12">
              <FaHome className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Home" onClick={() => handleNavigation("/home")} />
              <FaSearch className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Search" />
              <FaPrayingHands className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Pray" onClick={() => handleNavigation("/search")} />
              <FaFilm className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Reels" />
              <FaEnvelope className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="DM" onClick={() => handleNavigation("/post")} />
              <FaEnvelope className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="DM" onClick={() => handleNavigation("/chats")} />
              <FaBell className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Notification" />
              <FaUser className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Account" onClick={() => handleNavigation("/user-profile")} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default LoggedInSideBar;
