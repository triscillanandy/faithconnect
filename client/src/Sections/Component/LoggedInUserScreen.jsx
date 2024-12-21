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
import userImg1 from "./LoggedInScreenImages/1.png";
import userImg2 from "./LoggedInScreenImages/2.png";
import userImg3 from "./LoggedInScreenImages/3.png";
import userImg4 from "./LoggedInScreenImages/4.png";
import userImg5 from "./LoggedInScreenImages/5.png";
import userImg6 from "./LoggedInScreenImages/6.png";
import main from "./LoggedInScreenImages/main.png";
import like from "./LoggedInScreenImages/like.png";
import comment from "./LoggedInScreenImages/comment.png";

import save from "./LoggedInScreenImages/save.png";
import union from "./LoggedInScreenImages/Union.png";
import dots from "./LoggedInScreenImages/dots.png";
import img1 from "./PeopleImages/1.png";
import img2 from "./PeopleImages/2.png";
import img3 from "./PeopleImages/3.png";
import img4 from "./PeopleImages/4.png";
import img5 from "./PeopleImages/5.png";
import img6 from "./PeopleImages/6.png";
import img7 from "./PeopleImages/7.png";
import img8 from "./PeopleImages/8.png";
import img9 from "./PeopleImages/9.png";
import Logo from "./LoggedInScreenImages/Logo.png";
import notify from "./LoggedInScreenImages/notify.png";
import chat from "./LoggedInScreenImages/chat.png";
import Slider from "react-slick"; // Install using `npm install react-slick` and its dependencies
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LoggedInUserScreen = () => {
  const [posts, setPosts] = useState([]);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const [groups, setPrayerGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch Posts
  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/auth/getposts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setErrorMessage("An error occurred while fetching posts.");
    }
  };
// Fetch Suggested People
const fetchSuggestedPeople = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setErrorMessage("No token provided. Please log in.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/auth/suggestedPeople", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setSuggestedPeople(data.people);
    } else {
      console.error("Failed to fetch suggested people.");
    }
  } catch (error) {
    console.error("Error fetching suggested people:", error);
  }
};

// Fetch Prayer Groups
const fetchPrayerGroups = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setErrorMessage("No token provided. Please log in.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/auth/groups", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPrayerGroups(data.groups);
    } else {
      console.error("Failed to fetch prayer groups.");
    }
  } catch (error) {
    console.error("Error fetching prayer groups:", error);
  }
};


  useEffect(() => {
    fetchPosts();
    fetchSuggestedPeople();
    fetchPrayerGroups();
  }, []);

  return (
    <div className="grid grid-cols-[115.02px_1fr_352px] max-[1023px]:grid-cols-[100.02px_1fr_300px] max-[836px]:grid-cols-1 relative">
      <div className="hidden max-[836px]:flex max-[836px]:justify-between px-3 mb-3 items-center mt-3">
        <img className="w-[40px] cursor-pointer" src={Logo} alt="" />
        <div className="flex">
          <img className="w-[35px] cursor-pointer" src={notify} alt="" />
          <img className="w-[31px] cursor-pointer" src={chat} alt="" />
        </div>
      </div>
      <div className="bg-[#180f48] flex flex-col justify-between h-[823px] max-[836px]:flex-row max-[836px]:h-[45px] max-[836px]:absolute max-[836px]:bottom-0 max-[836px]:mt-8 max-[836px]:bg-[#ff6132] max-[836px]:items-center max-[836px]:w-[100%]">
        <img
          className="w-[46.95px] mx-auto h-[45px] cursor-pointer"
          src={HomePage}
          alt=""
        />
        <img
          className="mx-auto w-[46.95px] h-[45px] cursor-pointer"
          src={Search}
          alt=""
        />
        <img
          className="mx-auto w-[52px] h-[52.7px] cursor-pointer"
          src={Pray}
          alt=""
        />
        <img
          className="mx-auto w-[46.95px] h-[45px] cursor-pointer"
          src={Reels}
          alt=""
        />
        <img
          className="mx-auto w-[46.95px] h-[45px] cursor-pointer max-[836px]:hidden"
          src={DM}
          alt=""
        />
        <img
          className="mx-auto w-[46.95px] h-[90px] cursor-pointer max-[836px]:hidden"
          src={Notification}
          alt=""
        />
        <img
          className="mx-auto w-[41px] h-[28.38px] cursor-pointer"
          src={VideoImg}
          alt=""
        />
        <img
          className="mx-auto w-[46.95px] h-[45px] cursor-pointer"
          src={Account}
          alt=""
        />
        <img
          className="mx-auto h-[45px] w-[46.95px] cursor-pointer max-[836px]:hidden"
          src={Menu}
          alt=""
        />
      </div>
      <div className="ml-6">
        <div className="flex gap-4 ">
          <StoriesComponent navigateTo={"/user-profile"} imgSrc={main} />
          <StoriesComponent imgSrc={userImg1} personName="Wade Warren" />
          <StoriesComponent imgSrc={userImg2} personName="Jenny Wilson" />
          <StoriesComponent imgSrc={userImg3} personName={"Bessie Cooper"} />
          <StoriesComponent
            imgSrc={userImg4}
            personName={"Darlene Robertson"}
          />
          <StoriesComponent imgSrc={userImg5} personName={"Devon Lane"} />
          <StoriesComponent imgSrc={userImg6} personName={"P & G"} />
        </div>
        <div>
        <div className="ml-6">
        {/* Render Posts */}
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          posts.map((post) => (
            <PostsComponent
              key={post.id}
              userImg={`https://via.placeholder.com/150?text=User+${post.userId}`} // Replace with actual user image URL if available
              userName={`User ${post.userId}`} // Replace with actual user name if available
              description={post.description}
              media={post.media}
            />
          ))
        )}
      </div>
    </div>
      </div>
      <div className="max-[836px]:hidden">
        <div className="flex justify-between items-center px-4 mt-6 mb-3 ">
          <h1 className="font-bold text-lg">Suggested For You</h1>
          <p>See All</p>
        </div>
        {/* <div></div> */}
        <SuggestedFollows userName={"Wade Warren"} imgSrc={img1} />
        <SuggestedFollows imgSrc={img2} userName={"Esther Howard"} />
        <SuggestedFollows imgSrc={img3} userName={"Brooklyn Simmons"} />
        <SuggestedFollows imgSrc={img4} userName={"Guy Hawkins"} />
        <SuggestedFollows imgSrc={img5} userName={"Savannah Nguyen"} />
        <SuggestedFollows imgSrc={img6} userName={"Floyd Miles"} />
        <SuggestedFollows imgSrc={img7} userName={"Ronald Richards"} />
        <SuggestedFollows imgSrc={img8} userName={"Cameron Williamson"} />
        <SuggestedFollows imgSrc={img9} userName={"Jerome Bell"} />
        <div className="flex justify-between items-center mt-6 mb-2 px-4">
          <h2 className="font-bold text-lg">Prayer Groups</h2>
          <p>See All</p>
        </div>
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <SuggestedGroups 
               key={group.id} imgSrc={group.imgSrc} group_name={group.group_name} />
          ))
        ) : (
          <p>No prayer groups available</p>
        )}
      </div>
    </div>
  );
};
export default LoggedInUserScreen;

function StoriesComponent({ imgSrc, personName, navigateTo }) {
  const navigate = useNavigate();
  return (
    <div>
      <img
        src={imgSrc}
        onClick={() => navigate(navigateTo)}
        className="cursor-pointer"
        alt=""
      />
      <p className="text-[10px] font-[400]">{personName}</p>
    </div>
  );
}
function PostsComponent({ userImg, userName, description, media}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: "w-full",
  };

  return (
    <div className="mt-8 border rounded-lg p-4 max-w-lg mx-auto bg-white shadow-sm">
      {/* Post Header */}
      <div className="flex items-center gap-4 mb-3">
        <img src={userImg} alt={`${userName}'s profile`} className="w-10 h-10 rounded-full" />
        <p className="font-semibold">{userName}</p>
        <div className="cursor-pointer ml-auto">
          <img src={dots} alt="Options" className="w-5 h-5" />
        </div>
      </div>

      {/* Post Description */}
      <p className="mb-3 text-sm">{description}</p>

      {/* Post Media */}
      <div className="aspect-square overflow-hidden rounded-lg">
        <Slider {...settings}>
          {media.map((item) => (
            <img
              key={item.id}
              src={item.mediaUrl}
              alt="Post media"
              className="object-cover w-full h-full"
            />
          ))}
        </Slider>
      </div>

      {/* Post Actions */}
      <div className="flex mt-4 gap-4 items-center">
        <img src={like} alt="Like" className="cursor-pointer w-6 h-6" />
        <img src={comment} alt="Comment" className="cursor-pointer w-6 h-6" />
        <img src={union} alt="Share" className="cursor-pointer w-6 h-6" />
        <img src={save} alt="Save" className="ml-auto cursor-pointer w-6 h-6" />
      </div>
    </div>
  );
}


function SuggestedFollows({ imgSrc, userName }) {
  return (
    <div className="flex items-center mb-4">
      <img src={imgSrc} alt="" />
      <div className="ml-2">
        <p>{userName}</p>
        <p className="text-[#A0A0A0] max-[1023px]:text-base">
          Kashaf Khan | Graphic Designer
        </p>
      </div>
      <button className="bg-[#ff6132] rounded-[4px] w-[68px] ml-2 mt-6 text-white ">
        Follow
      </button>
    </div>
  );
  
}
function SuggestedGroups({ imgSrc, group_name}) {
  return (
    <div className="flex items-center mb-4">
      <img src={imgSrc} alt="" />
      <div className="ml-2">
        <p>{group_name}</p>
        <p className="text-[#A0A0A0] max-[1023px]:text-base">Kashaf House</p>
      </div>
    </div>
  );
}