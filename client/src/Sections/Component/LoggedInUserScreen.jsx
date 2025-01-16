import React, { useState, useEffect } from "react";
import { FaHome, FaSearch, FaPrayingHands, FaFilm, FaEnvelope, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logo from "./LoggedInScreenImages/Logo.png";
import main from "./LoggedInScreenImages/main.png";
import userImg1 from "./LoggedInScreenImages/1.png";
import userImg2 from "./LoggedInScreenImages/2.png";
import userImg3 from "./LoggedInScreenImages/3.png";
import userImg4 from "./LoggedInScreenImages/4.png";
import userImg5 from "./LoggedInScreenImages/5.png";
import userImg6 from "./LoggedInScreenImages/6.png";
import like from "./LoggedInScreenImages/like.png";
import comment from "./LoggedInScreenImages/comment.png";
import save from "./LoggedInScreenImages/save.png";
import union from "./LoggedInScreenImages/Union.png";
import dots from "./LoggedInScreenImages/dots.png";

const LoggedInUserScreen = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const [groups, setPrayerGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPosts();
    fetchSuggestedPeople();
    fetchPrayerGroups();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/getOtherPosts`, {
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

  const fetchSuggestedPeople = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/suggested-users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
       // console.log(data);
        setSuggestedPeople(data.suggestedUsers);
      } else {
        console.error("Failed to fetch suggested people.");
      }
    } catch (error) {
      console.error("Error fetching suggested people:", error);
    }
  };

  const fetchPrayerGroups = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/groups`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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

  return (
    <div className="flex min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-8 px-4 flex flex-col items-center w-20 fixed h-full">
        <div className="mb-12">
          <img className="w-[40px] cursor-pointer" src={Logo} alt="Logo" />
        </div>
        <div className="flex flex-col items-center gap-12">
          <FaHome className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Home" />
          <FaSearch className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Search" />
          <FaPrayingHands className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Pray" />
          <FaFilm className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Reels" />
          <FaEnvelope className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="DM" />
          <FaEnvelope className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="DM" />
          <FaBell className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Notification" />
          <FaUser className="cursor-pointer w-8 h-8 text-gray-600 hover:text-blue-500" title="Account" onClick={() => navigate("/user-profile")} />
       
        </div>
      </nav>

      <div className="flex flex-1 ml-20">
      {  /* Main Content */}
          <div className="flex-1 p-4 overflow-y-auto h-screen scrollbar-hide">
            <div className="flex gap-4 mb-4">
              <StoriesComponent navigateTo={"/user-profile"} imgSrc={main} />
              <StoriesComponent imgSrc={userImg1} personName="Wade Warren" />
              <StoriesComponent imgSrc={userImg2} personName="Jenny Wilson" />
              <StoriesComponent imgSrc={userImg3} personName={"Bessie Cooper"} />
              <StoriesComponent imgSrc={userImg4} personName={"Darlene Robertson"} />
              <StoriesComponent imgSrc={userImg5} personName={"Devon Lane"} />
              <StoriesComponent imgSrc={userImg6} personName={"P & G"} />
            </div>
            <div>
              {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                posts.map((post) => (
            <PostsComponent
              key={post.id}
              userImg={post.user?.profileImage}
              userName={post.user?.username}
              description={post.description}
              media={post.media}
            />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
        <div className="w-[352px] p-4 hidden lg:block">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-lg">Suggested For You</h1>
            <p className="text-blue-500 cursor-pointer">See All</p>
          </div>
          {suggestedPeople.map((people) => (
            <SuggestedFollows key={people.id} userName={people.username} imgSrc={people.profile_image} />
          ))}
          <div className="flex justify-between items-center mt-6 mb-2">
            <h2 className="font-bold text-lg">Prayer Groups</h2>
            <p className="text-blue-500 cursor-pointer">See All</p>
          </div>
          {groups.length > 0 ? (
            groups.map((group) => (
              <SuggestedGroups key={group.id} imgSrc={group.imgSrc} group_name={group.group_name} />
            ))
          ) : (
            <p>No prayer groups available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggedInUserScreen;

function StoriesComponent({ imgSrc, personName, navigateTo }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <img
        src={imgSrc}
        onClick={() => navigate(navigateTo)}
        className="cursor-pointer rounded-full w-16 h-16"
        alt=""
      />
      <p className="text-[10px] font-[400] mt-1">{personName}</p>
    </div>
  );
}

function PostsComponent({ userImg, userName, description, media }) {
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
      <div className="flex items-center gap-4 mb-3">
        <img src={userImg} alt={`${userName}'s profile`} className="w-10 h-10 rounded-full" />
        <p className="font-semibold">{userName}</p>
        <div className="cursor-pointer ml-auto">
          <img src={dots} alt="Options" className="w-5 h-5" />
        </div>
      </div>
      <p className="mb-3 text-sm">{description}</p>
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
      <img src={imgSrc} alt="" className="w-10 h-10 rounded-full" />
      <div className="ml-2 flex-1">
        <p className="font-semibold">{userName}</p>
        <p className="text-[#A0A0A0] text-sm">Followed By</p>
      </div>
      <button className="bg-[#ff6132] rounded-[4px] px-4 py-1 text-white">Follow</button>
    </div>
  );
}

function SuggestedGroups({ imgSrc, group_name }) {
  return (
    <div className="flex items-center mb-4">
      <img src={imgSrc} alt="" className="w-10 h-10 rounded-full" />
      <div className="ml-2">
        <p className="font-semibold">{group_name}</p>
        <p className="text-[#A0A0A0] text-sm">Kashaf House</p>
      </div>
    </div>
  );
}
