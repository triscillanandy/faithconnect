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
  const [likesCount, setLikesCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLikes(postId);
    fetchComments(postId).then((fetchedComments) => {
      setComments(fetchedComments);
    });
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
        setIsLiked(userLiked);
        setLikesCount(data.likes.length);
      } else {
        console.error("Failed to fetch likes.");
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const fetchComments = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return [];
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/posts/${postId}/comments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.comments || [];
      } else {
        console.error("Failed to fetch comments.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
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
        setIsLiked((prev) => !prev);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      } else {
        console.error("Failed to toggle like.");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addComment = async (postId, content) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, content }),
      });

      if (!response.ok) {
        console.error("Failed to add comment.");
      } else {
        const updatedComments = await fetchComments(postId);
        setComments(updatedComments);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
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
          <FaHeart className="cursor-pointer w-6 h-6 text-red-500" onClick={toggleLike} />
        ) : (
          <FaRegHeart className="cursor-pointer w-6 h-6 text-black" onClick={toggleLike} />
        )}
        <img src={comment} alt="Comment" className="cursor-pointer w-6 h-6" onClick={toggleModal} />
        <img src={union} alt="Share" className="cursor-pointer w-6 h-6" />
        <img src={save} alt="Save" className="ml-auto cursor-pointer w-6 h-6" />
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold">{likesCount} Likes</p>
        <p className="text-sm font-semibold">{comments.length} Comments</p>
        {comments.length > 0 && (
          <>
            <div className="mt-2">
              <p className="text-sm font-semibold">{comments[0].user.username}</p>
              <p className="text-sm">{comments[0].content}</p>
            </div>
            <p className="text-blue-500 cursor-pointer mt-2" onClick={toggleModal}>
              View all comments
            </p>
          </>
        )}
      </div>

      <CommentModal
        postId={postId}
        userImg={userImg}
        userName={userName}
        description={description}
        isOpen={isModalOpen}
        onClose={toggleModal}
        addComment={addComment}
        fetchComments={fetchComments}
      />
    </div>
  );
}
function CommentModal({ postId, userImg, userName, description, isOpen, onClose, addComment, fetchComments }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchComments(postId).then((fetchedComments) => {
        setComments(fetchedComments);
      });
    }
  }, [isOpen, postId, fetchComments]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addComment(postId, newComment); // Add the comment
      setNewComment(""); // Clear the input
      const updatedComments = await fetchComments(postId); // Fetch updated comments
      setComments(updatedComments); // Update the comments state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Comments</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-3">
            <img src={userImg} alt={`${userName}'s profile`} className="w-10 h-10 rounded-full" />
            <p className="font-semibold">{userName}</p>
          </div>
          <p className="mb-3 text-sm">{description}</p>
        </div>
        <div className="max-h-64 overflow-y-auto mb-4">
          {comments && comments.map((comment) => (
            <div key={comment.id} className="mb-2">
              <p className="text-sm font-semibold">{comment.user.username}</p>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border rounded-lg p-2"
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment} className="bg-blue-500 text-white rounded-lg px-4 py-2">
            Post
          </button>
        </div>
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