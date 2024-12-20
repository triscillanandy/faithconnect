import frame1 from "./Profile-Images/Frame1.png";
import frame2 from "./Profile-Images/Frame2.png";
import frame3 from "./Profile-Images/Frame3.png";
import frame4 from "./Profile-Images/Frame4.png";
import frame5 from "./Profile-Images/Frame5.png";
import frame6 from "./Profile-Images/Frame6.png";
import frame7 from "./Profile-Images/Frame7.png";
import frame8 from "./Profile-Images/Frame8.png";
import frame9 from "./Profile-Images/Frame9.png";
import frame10 from "./Profile-Images/Frame10.png";
import frame11 from "./Profile-Images/Frame11.png";
import frame12 from "./Profile-Images/Frame12.png";
import userImg from "./Profile-Images/userImg.png";
import reels from "./Profile-Images/reels.png";
import profileMenu from "./Profile-Images/menu.png";
import tag from "./Profile-Images/tags.png";
import LoggedInSideBar from "./LoggedInSideBar";
const UserProfile = () => {
  return (
    <div className="flex gap-24 lg:gap-48 xl:gap-72 max-[833px]:flex-col-reverse max-[833px]:px-8">
      {/* <div className=" h-[823px] bg-[#FF6132] flex flex-col  justify-between max-[833px]:flex-row max-[833px]:h-[45px] max-[833px]:items-center max-[833px]:w-390px relative max-[833px]:bottom-0 max-[833px]:px-3 max-[833px]:py-2">
        <img
          src={HomePage}
          className="w-[46.95px] h-[45px] max-[833px]:mx-0 mx-auto cursor-pointer"
          alt=""
        />
        <img
          className="w-[46.95px] h-[45px] max-[833px]:mx-0 mx-auto cursor-pointer"
          src={Search}
          alt=""
        />
        <img
          className="w-[52px] max-[833px]:mx-0 h-[52.7px] mx-auto cursor-pointer"
          src={Pray}
          alt=""
        />
        <img
          className="w-[46.95px] max-[833px]:mx-0 h-[45px] mx-auto cursor-pointer"
          src={Reels}
          alt=""
        />
        <img
          className="w-[46.95px] max-[833px]:mx-0 h-[45px] mx-auto cursor-pointer max-[833px]:hidden"
          src={DM}
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
          alt=""
        />
        <img
          className="w-[46.95px] max-[833px]:mx-0 h-[45px] mx-auto cursor-pointer"
          src={Account}
          alt=""
        />
        <img
          className="w-[46.95px] max-[833px]:mx-0 h-[45px] mx-auto cursor-pointer max-[833px]:hidden"
          src={Menu}
          alt=""
        />
      </div> */}
      <LoggedInSideBar />
      <div className="mt-10">
        <div className="flex gap-6">
          <p>jane_cooper_123</p>
          <button className="w-[170px] rounded-[6px] h-[30px] bg-[#EFEFEF]">
            Edit Profile
          </button>
          <button className="w-[170px] rounded-[6px] h-[30px] bg-[#EFEFEF]">
            Share profile
          </button>
        </div>
        <div className="flex items-center gap-10 mt-5">
          <div>
            <img src={userImg} alt="" />
            <p className="text-[10px]">Jane Cooper</p>
          </div>
          <div>
            <p className="text-[16px]">65</p>
            <p className="text-[12px]">Posts</p>
          </div>
          <div>
            <p className="text-[16px]">600</p>
            <p className="text-[12px]">Followers</p>
          </div>
          <div>
            <p className="text-[16px]">210</p>
            <p className="text-[12px]">Following</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-[11px] text-[#ADADAD]">Artist</p>
          <p className="text-[11px]">Believe in Christ</p>
          <p className="text-[11px]">All will be well in His Name</p>
        </div>
        <div className="flex gap-28 items-center mt-8">
          <img className="cursor-pointer" src={profileMenu} alt="" />
          <img className="cursor-pointer" src={reels} alt="" />
          <img className="cursor-pointer" src={tag} alt="" />
        </div>
        <div className=" grid grid-cols-4 mt-4 max-[823px]:grid-cols-[1fr_1fr_1fr] gap-y-1">
          <img src={frame1} alt="" />
          <img src={frame2} alt="" />
          <img src={frame3} alt="" />
          <img src={frame4} alt="" />
          <img src={frame5} alt="" />
          <img src={frame6} alt="" />
          <img src={frame7} alt="" />
          <img src={frame8} alt="" />
          <img src={frame9} alt="" />
          <img src={frame10} alt="" />
          <img src={frame11} alt="" />
          <img src={frame12} alt="" />
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
