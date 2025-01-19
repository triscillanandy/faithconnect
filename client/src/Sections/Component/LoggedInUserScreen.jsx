import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInSideBar from "./LoggedInSideBar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaRegHeart,FaHeart} from "react-icons/fa"; // Import the heart icon from React Icons

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

  const joinGroup = async (groupId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/groups/${groupId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchPrayerGroups(); // Refresh the prayer groups list
      } else {
        console.error("Failed to join group.");
      }
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  const leaveGroup = async (groupId) => {
    const token = localStorage.getItem("token");
    const userDetail = localStorage.getItem("user:detail");
    const user = userDetail ? JSON.parse(userDetail) : null;
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/groups/${groupId}/leave`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });

      if (response.ok) {
        fetchPrayerGroups(); // Refresh the prayer groups list
      } else {
        console.error("Failed to leave group.");
      }
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Navigation Bar */}
      <LoggedInSideBar />

      <div className="flex flex-1 ml-20">
        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto h-screen scrollbar-hide">
          <div className="flex gap-4 mb-4">
            {/* Add content here if needed */}
          </div>
          <div>
            {errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              posts.map((post) => (
                <PostsComponent
                  key={post.id}
                  postId={post.id}
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

          <div className="flex justify-between items-center mt-6 mb-2">
            <h2 className="font-bold text-lg">Prayer Groups</h2>
            <p className="text-blue-500 cursor-pointer">See All</p>
          </div>
          {groups.length > 0 ? (
            groups.slice(0, 4).map((group) => (
              <SuggestedGroups
                key={group.id}
                imgSrc={group.imgSrc}
                group_name={group.group_name}
                groupId={group.id}
                isMember={group.is_member}
                joinGroup={joinGroup}
                leaveGroup={leaveGroup}
              />
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

function PostsComponent({ postId, userImg, userName, description, media }) {
  const [isLiked, setIsLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLikes(postId);
  }, [postId]);

  const fetchLikes = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/posts/${postId}/likes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userDetail = localStorage.getItem("user:detail");
        const user = userDetail ? JSON.parse(userDetail) : null;
        const userLiked = data.likes.some((like) => like.userId === user.id);
        setIsLiked(userLiked); // Update isLiked state
      } else {
        console.error("Failed to fetch likes.");
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const toggleLike = async () => {
    const token = localStorage.getItem("token");
    const userDetail = localStorage.getItem("user:detail");
    const user = userDetail ? JSON.parse(userDetail) : null;
    if (!token || !user) {
      setErrorMessage("No token or user details provided. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/likes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId: user.id }),
      });

      if (response.ok) {
        setIsLiked((prev) => !prev); // Toggle like status
        fetchLikes(postId); // Refresh likes
      } else {
        console.error("Failed to toggle like.");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
          {media.map((item) =>
            item.mediaType.startsWith("video") ? (
              <video key={item.id} controls className="object-cover w-full h-full">
                <source src={item.mediaUrl} type={item.mediaType} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img key={item.id} src={item.mediaUrl} alt="Post media" className="object-cover w-full h-full" />
            )
          )}
        </Slider>
      </div>
      <div className="flex mt-4 gap-4 items-center">
      {isLiked ? (
  <FaHeart
    className="cursor-pointer w-6 h-6 text-red-500"
    onClick={toggleLike}
  />
) : (
  <FaRegHeart
    className="cursor-pointer w-6 h-6 text-black "
    onClick={toggleLike}
  />
)}
        <img src={comment} alt="Comment" className="cursor-pointer w-6 h-6" />
        <img src={union} alt="Share" className="cursor-pointer w-6 h-6" />
        <img src={save} alt="Save" className="ml-auto cursor-pointer w-6 h-6" />
      </div>
    </div>
  );
}

function SuggestedGroups({ imgSrc, group_name, groupId, isMember, joinGroup, leaveGroup }) {
  const [isGroupMember, setIsGroupMember] = useState(isMember);

  const handleJoinLeave = async () => {
    if (isGroupMember) {
      await leaveGroup(groupId);
    } else {
      await joinGroup(groupId);
    }
    setIsGroupMember(!isGroupMember);
  };

  return (
    <div className="flex items-center mb-4">
      <img src={imgSrc} alt="" className="w-10 h-10 rounded-full" />
      <div className="ml-2 flex-1">
        <p className="font-semibold">{group_name}</p>
        <p className="text-[#A0A0A0] text-sm">Kashaf House</p>
      </div>
      <button
        className={`rounded-[4px] px-4 py-1 text-white ${isGroupMember ? "bg-gray-500" : "bg-[#ff6132]"}`}
        onClick={handleJoinLeave}
      >
        {isGroupMember ? "Leave" : "Join"}
      </button>
    </div>
  );
}