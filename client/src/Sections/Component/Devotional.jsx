/* eslint-disable react/prop-types */
import LoggedInSideBar from "./LoggedInSideBar";
import devotionalImage from "./Devotional-Images/devotional-image.png";
import comment from "./Devotional-Images/comment.png";
import like from "./Devotional-Images/Favorite.png";
import { useState } from "react";
import person1 from "./Devotional-Images/comment1.png";
import person2 from "./Devotional-Images/comment2.png";
import person3 from "./Devotional-Images/comment3.png";
import commentImg from "./Devotional-Images/male-user.png";
// import red from "./Devotional-Images/red.png";
import { FaHeart } from "react-icons/fa";

const Devotional = () => {
  const [userComent, setUserComment] = useState("");
  const handleChange = (e) => {
    setUserComment(e.target.value);
  };
  return (
    <div className="flex gap-60 max-loggedInScreen:flex-col-reverse max-loggedInScreen:px-4">
      <LoggedInSideBar />
      <div className="mt-4">
        <h1 className="text-center font-bold text-2xl mb-4 max-loggedInScreen:text-left max-loggedInScreen:flex max-loggedInScreen:justify-center">
          Devotional
        </h1>
        <img src={devotionalImage} alt="" />
        <p className="font-[600] text-3xl mb-4">
          Transformation by the Holy Spirit
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-mainTheme text-white px-2 rounded-lg py-1 text-[10px]">
            Start Prayer Plan
          </button>
          <button className="text-[10px] bg-[#D9D9D9] px-2 py-1 rounded-lg">
            Save for Later
          </button>
          <div>
            <p>
              LifeSpring Church <br /> @lifespring
            </p>
            {/* <p>@lifespring</p> */}
          </div>
          <p>Following</p>
        </div>
        <hr className="bg-gray-200 h-1 my-3" />
        <p>Discover the power of prayer</p>
        <div className="flex gap-8 mt-5">
          <div>
            <img className="cursor-pointer" src={like} alt="" />
            <p>72 likes</p>
          </div>
          <div>
            <img src={comment} alt="" />
            <p>10 comments</p>
          </div>
        </div>
        <div className="flex mt-4 gap-2">
          <img src={commentImg} alt="" />
          <input
            type="text"
            className="border px-4 rounded-lg"
            placeholder="Add Comment"
            value={userComent}
            onChange={(e) => handleChange(e)}
          />
          <button className="text-mainTheme ml-20">Post</button>
        </div>
        <div>
          <CommentComponent
            imgSrc={person3}
            userId="@Fajeck_it12"
            comment="I love this plan"
          />
          <CommentComponent
            imgSrc={person2}
            userId="@yvonne_light"
            comment="This plan is life changing"
          />
          <CommentComponent
            imgSrc={person1}
            userId="@john_doe23"
            comment="Love this plan"
          />
        </div>
      </div>
    </div>
  );
};
export default Devotional;

function CommentComponent({ imgSrc, userId, comment }) {
  //   const [showLike, setShowLike] = useState(false);
  //   const handleLike = () => {
  //     setShowLike(!showLike);

  //   };
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex gap-3 mt-5 items-center">
      <img src={imgSrc} alt="" />
      <div>
        <p>{userId}</p>
        <p>{comment}</p>
      </div>
      {/* <img
        className="cursor-pointer"
        src={showLike ? red : like}
        onClick={handleLike}
        alt=""
      /> */}
      <button
        onClick={() => setLiked(!liked)}
        className="transition-transform duration-300 ease-in-out "
      >
        <FaHeart
          className={`text-2xl ml-auto ${
            liked ? "text-red-500" : "text-gray-300 "
          }`}
        />
      </button>
    </div>
  );
}
