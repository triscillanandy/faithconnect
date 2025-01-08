/* eslint-disable react/no-unescaped-entities */
import LoggedInSideBar from "./LoggedInSideBar";
import dots from "./ReelsImages/Ellipsis.png";
import love from "./ReelsImages/Love.png";
import send from "./ReelsImages/send.png";
import comment from "./ReelsImages/comment.png";
import image from "./ReelsImages/image.png";
import play from "./ReelsImages/circled-play.png";
import img from "./ReelsImages/img.png";
import music from "./ReelsImages/music.png";

function Reels() {
  return (
    <div className="flex gap-48 max-loggedInScreen:flex-col-reverse max-loggedInScreen:px-5">
      <LoggedInSideBar />
      <div>
        <div className="flex mt-10 gap-4 ">
          <div className="relative">
            <img src={image} alt="" />
            <img
              className="absolute left-36  top-64 cursor-pointer"
              src={play}
              alt=""
            />
            <div className="absolute bottom-5 text-white left-4">
              <div className="flex items-center gap-4">
                <img src={img} alt="" />
                <p>Lord's Favor</p>
                <button className="border-[1px] px-8 py-1 rounded-xl">
                  Follow
                </button>
              </div>
              <p>Does the Lord Listen to prayers</p>
              <div className="flex items-center gap-3">
                <img src={music} alt="" />
                <p>Trust in God Original Audio</p>
              </div>
            </div>
          </div>
          {/* <img src="" alt="" /> */}
          <div className="mt-60">
            <img className="cursor-pointer mb-3" src={love} alt="" />
            <img className="cursor-pointer mb-3" src={comment} alt="" />
            <img className="cursor-pointer mb-3" src={send} alt="" />
            <img className="cursor-pointer mb-3" src={dots} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reels;
