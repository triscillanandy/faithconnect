import React, { useState, useEffect } from "react";
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
import profileMenu from "./Profile-Images/menu.png";
import reels from "./Profile-Images/reels.png";
import tag from "./Profile-Images/tags.png";
import LoggedInSideBar from "./LoggedInSideBar";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the user profile details
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("https://faithconnect.onrender.com/api/auth/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          console.error("Error fetching user profile:", response.statusText);
          return;
        }

        const data = await response.json();
        if (data.user) {
          setUserProfile(data.user);
        } else {
          console.error("User data not found:", data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }
    try {
      const response = await fetch("https://faithconnect.onrender.com/api/auth/my-posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts); // Assuming the response contains a "posts" array
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setErrorMessage("An error occurred while fetching posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex gap-24 lg:gap-48 xl:gap-72 max-[833px]:flex-col-reverse max-[833px]:px-8">
      <LoggedInSideBar />
      <div className="mt-10">
        <div className="flex gap-6">
          <p>{userProfile.username}</p>
          <button className="w-[170px] rounded-[6px] h-[30px] bg-[#EFEFEF]">
            Edit Profile
          </button>
          <button className="w-[170px] rounded-[6px] h-[30px] bg-[#EFEFEF]">
            Share profile
          </button>
        </div>
        <div className="flex items-center gap-10 mt-5">
          <div>
            <img
              src={userProfile.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <p className="text-[10px]">{userProfile.username}</p>
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
        {/* <div className="grid grid-cols-4 mt-4 max-[823px]:grid-cols-[1fr_1fr_1fr] gap-y-1">
          {posts.map((post, index) => (
            <div key={index}>
              <img src={post.media} alt={post.caption} />
              <p>{post.caption}</p>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-4">
  {posts.map((post) =>
    post.media && post.media.length > 0 ? (
      post.media.map((item) => (
        <div
          key={item.id}
          className="relative w-full aspect-square overflow-hidden"
        >
          <img
            src={item.mediaUrl}
            alt="Post media"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))
    ) : (
      <div
        key={post.id}
        className="relative w-full aspect-square flex items-center justify-center bg-gray-100 text-gray-500"
      >
 
      </div>
    )
  )}
</div>

      </div>
    </div>
  );
};

export default UserProfile;
