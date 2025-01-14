/* eslint-disable react/prop-types */
import HomePage from "./LoggedInScreenImages/HomePage.png";
import Account from "./LoggedInScreenImages/Account.png";
import Menu from "./LoggedInScreenImages/Menu.png";
import Pray from "./Registration-Images/Pray-white.png";
import Search from "./LoggedInScreenImages/Search.png";
import Reels from "./LoggedInScreenImages/Reels.png";
import Notification from "./LoggedInScreenImages/Notification.png";
import DM from "./LoggedInScreenImages/DM.png";
import VideoImg from "./LoggedInScreenImages/video.png";
import { useNavigate } from "react-router-dom";
const LoggedInSideBar = ({ showSideBar = true }) => {
  const navigate = useNavigate();

  return (
    <>
      {showSideBar && (
        <div
          style={
            {
              // display: showSideBar ? "flex" : "none",
              // height: showSideBar ? "100%" : "",
            }
          }
          className=" h-[825px] bg-[#180F4B] flex flex-col  justify-between max-[833px]:flex-row max-[833px]:h-[45px] max-[833px]:items-center max-[833px]:w-390px relative max-[833px]:bottom-0 max-[833px]:px-3 max-[833px]:py-2"
        >
          <img
            src={HomePage}
            className="w-[46.95px] h-[45px] max-[833px]:mx-0 mx-auto cursor-pointer"
            alt=""
          />
          <img
            className="w-[46.95px] h-[45px] max-[833px]:mx-0 mx-auto cursor-pointer"
            src={Search}
            onClick={() => navigate("/search")}
            alt=""
          />
          <img
            className="w-[52px] max-[833px]:mx-0 h-[52.7px] mx-auto cursor-pointer"
            src={Pray}
            alt=""
            onClick={() => navigate("/devotional")}
          />
          <img
            className="w-[46.95px] max-[833px]:mx-0 h-[45px] mx-auto cursor-pointer"
            src={Reels}
            onClick={() => navigate("/reels")}
            alt=""
          />
          <img
            className="w-[46.95px] max-[833px]:mx-0 h-[45px] mx-auto cursor-pointer max-[833px]:hidden"
            src={DM}
            onClick={() => navigate("/chats")}
            alt=""
          />
          <img
            className="w-[46.95px] max-[833px]:mx-0 h-[90px] mx-auto cursor-pointer max-[833px]:hidden"
            src={Notification}
            alt=""
          />
          <img
            className="w-[41px] max-[833px]:mx-0 h-[28.38px] mx-auto cursor-pointer"
            src={VideoImg}
            onClick={() => navigate("/post")}
            alt=""
          />
          <img
            className="w-[46.95px] max-[833px]:mx-0 h-[45px] mx-auto cursor-pointer"
            src={Account}
            onClick={() => navigate("/user-profile")}
            alt=""
          />
          <img
            className="w-[46.95px] max-[833px]:mx-0 h-[45px] mx-auto cursor-pointer max-[833px]:hidden"
            src={Menu}
            alt=""
          />
        </div>
      )}
    </>
  );
};
export default LoggedInSideBar;
