import React, { useEffect, useState, useRef } from "react";
import filter from "./chat-images/filter.png";
import people from "./chat-images/people.png";
import Call from "./chat-images/Call.png";
import Group from "./chat-images/Group.png";
import arrow from "./chat-images/arrow.png";
import Search from "./chat-images/Search.png";
import camera from "./chat-images/camera.png";
import sound from "./chat-images/sound.png";
import files from "./chat-images/files.png";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import following from "./chat-images/following.png";
import chat from "./chat-images/chat.png";
import groups from "./chat-images/groups.png";
import no from "./chat-images/no.png";
import blocked from "./chat-images/blocked.png";
import LoggedInSideBar from "./LoggedInSideBar";


const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showNewGroupPopup, setShowNewGroupPopup] = useState(false);
  const [showNewCommunityPopup, setShowNewCommunityPopup] = useState(false);
  const [showSuggestedUsersModal, setShowSuggestedUsersModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 833);
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user:detail"));
    const token = localStorage.getItem("token");
    setSocket(io(`${import.meta.env.VITE_API_URL}`));

    const fetchConversations = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/conversations/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setConversations(Array.isArray(data) ? data : []);
    };

    const fetchGroups = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setGroupsList(data.groups || []);
    };

    const fetchSuggestedUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/suggested-friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSuggestedUsers(data.suggestedUsers || []);
    };

    fetchConversations();
    fetchGroups();
    fetchSuggestedUsers();
  }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("joinRoom", JSON.parse(localStorage.getItem("user:detail")).id);
  //     console.log("Joining room:", JSON.parse(localStorage.getItem("user:detail")).id);
  //     socket.on("get-users", (activeUsers) => {
  //       console.log("Active users:", activeUsers);
  //     });

  //     socket.on("receive-message", (data) => {
  //       setMessages((prev) => [...prev, { text: data.message, senderId: data.senderId }]);
  //     });

  //     socket.on("receive-group-message", (data) => {
  //       if (data.groupId === selectedChat?.groupId) {
  //         setMessages((prev) => [...prev, { text: data.message, senderId: data.senderId }]);
  //       }
  //     });
  //   }
  // }, [socket, selectedChat]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", JSON.parse(localStorage.getItem("user:detail")).id);
  
      // Define handler functions
      const handleGetUsers = (activeUsers) => {
        console.log("Active users:", activeUsers);
      };
  
      const handleReceiveMessage = (data) => {
        setMessages((prev) => [...prev, { text: data.message, senderId: data.senderId }]);
      };
  
      const handleReceiveGroupMessage = (data) => {
        console.log("Received group message:", data);
        if (data.groupId === selectedChat?.groupId) {
          console.log("Group ID matches. Adding message.");
          setMessages((prev) => [...prev, { text: data.message, senderId: data.senderId }]);
        }
      };
  
      // Add listeners
      socket.on("get-users", handleGetUsers);
      socket.on("receive-message", handleReceiveMessage);
      socket.on("receive-group-message", handleReceiveGroupMessage);
  
      // Cleanup function
      return () => {
        socket.off("get-users", handleGetUsers);
        socket.off("receive-message", handleReceiveMessage);
        socket.off("receive-group-message", handleReceiveGroupMessage);
      };
    }
  }, [socket, selectedChat]); // Dependencies: socket and selectedChat

  
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async (conversationId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/messages/${conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setMessages(data);
  };


  const fetchGroupMessages = async (groupId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/group-messages/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
  // console.log("Group messages:", data);
    // Map messages to include senderName
    const messagesWithSenderName = data.map((msg) => ({
      ...msg,
      senderId: msg.user?.id || msg.senderId,
      senderName: msg.user?.username || "Unknown User", // Include senderName
    }));
  
    setMessages(messagesWithSenderName); // Set messages with senderName
  };


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const user = JSON.parse(localStorage.getItem("user:detail"));
    const token = localStorage.getItem("token");
    const newMessage = selectedChat.isGroup
      ? {
          conversationId: selectedChat.conversationId,
          senderId: user.id,
          message,
          groupId:selectedChat.groupId
        }
      : {
          conversationId: selectedChat.conversationId,
          senderId: user.id,
          receiverId: selectedUser.id,
          message,
        };


        
    socket.emit(selectedChat.isGroup ? "sendGroupMessage" : "sendMessage", newMessage);
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/${selectedChat.isGroup ? "groupmessages" : "messages"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMessage),
    
      }
    );
    console.log("SENT", newMessage);

    setMessages((prev) => [...prev, { text: message, senderId: user.id }]);
    setMessage("");
   };
  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!message.trim()) return;
  
  //   const user = JSON.parse(localStorage.getItem("user:detail"));
  //   const token = localStorage.getItem("token");
  //   const newMessage = selectedChat.isGroup
  //     ? {
  //         conversationId: selectedChat.conversationId,
  //         senderId: user.id,
  //         message,
  //         groupId: selectedChat.groupId
  //       }
  //     : {
  //         conversationId: selectedChat.conversationId,
  //         senderId: user.id,
  //         receiverId: selectedUser.id,
  //         message,
  //       };
  
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/auth/${selectedChat.isGroup ? "groupmessages" : "messages"}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(newMessage),
  //       }
  //     );
  
  //     if (!response.ok) throw new Error('Failed to send message');
  //     const data = await response.json();
  
  //     // Add the message from the server response
  //     // setMessages((prev) => [...prev, data]);
  //     setMessages((prev) => [...prev, { text: message, senderId: user.id }]);
  //     setMessage("");
  //     console.log("SENT", data);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  const handleStartChat = async (user) => {
    setSelectedUser(user);
    setSelectedChat(null); // Clear any selected chat
  
    const token = localStorage.getItem("token");
    const loggedInUserId = JSON.parse(localStorage.getItem("user:detail")).id;
  
    try {
      // Step 1: Check if a conversation already exists
      const existingConversation = conversations.find((conv) => {
        // Ensure the conversation and participants exist
        if (!conv || !conv.participants) return false;
  
        // Check if the selected user is a participant
        return conv.participants.some((participant) => participant.id === user.id);
      });
  
      if (existingConversation) {
        // Step 2: If a conversation exists, load it
        console.log("Existing conversation found:", existingConversation);
        handleSelectChat(existingConversation); // Load the existing conversation
      } else {
        // Step 3: If no conversation exists, create a new one
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/conversations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userIds: [loggedInUserId, user.id] }),
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error creating conversation:", errorData);
          throw new Error(errorData.message || "Failed to create conversation");
        }
  
        const newConversation = await response.json();
        console.log("New conversation created:", newConversation);
  
        // Ensure the conversation object has a conversationId
        if (!newConversation.id) {
          console.error("New conversation is missing id:", newConversation);
          throw new Error("New conversation is missing id");
        }
  
        // Add the new conversation to the conversations list
        setConversations((prev) => [...prev, newConversation]);
  
        // Load the new conversation
        handleSelectChat({
          conversationId: newConversation.id,
          receiver: user, // Ensure the receiver is set to the selected user
        });
      }
  
      // Close the suggested users modal
      setShowSuggestedUsersModal(false);
    } catch (error) {
      console.error("Error handling start chat:", error);
    }
  };


  

  

  const handleGroupSelection = async (group) => {
    const groupData = {
      isGroup: true,
      groupId: group.id,
      group_name: group.group_name,
    };
  
    const token = localStorage.getItem("token");
  
    try {
      // First, check if conversation exists for the group or create one
      const conversationRes = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/conversations/group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ groupId: group.id }),
      });
  
      const conversationData = await conversationRes.json();
  
      if (conversationRes.status === 200 || conversationRes.status === 201) {
        // Successfully created or retrieved conversation
        const user = JSON.parse(localStorage.getItem("user:detail"));
        socket.emit("joinGroup", { groupId: group.id, userId: user.id }); // Emit joinGroup event
        console.log("Joined group conversation:", conversationData);
  
        // Update the selected chat state, including conversationId
        handleSelectChat({
          ...groupData,
          conversationId: conversationData.id, // Ensure this is passed
        });
  
        // Optionally, fetch the group messages after creating/selecting the conversation
        fetchGroupMessages(group.id);
      } else {
        console.error("Failed to create or fetch group conversation", conversationData);
      }
    } catch (error) {
      console.error("Error handling group selection:", error);
    }
  };


  const handleSelectChat = async (conversation) => {
    if (conversation.isGroup) {
      // Handle group chat selection
      if (conversation.groupId) {
        // Step 1: Fetch group messages
        await fetchGroupMessages(conversation.groupId);
  
        // Step 2: Update selectedChat state with group details
        setSelectedChat({
          isGroup: true,
          groupId: conversation.groupId,
          group_name: conversation.group_name,
          conversationId: conversation.conversationId || conversation.id, // Ensure this is included
        });
      } else {
        console.error("Missing groupId for group conversation");
      }
    } else {
      // Handle individual chat selection
      setSelectedUser(conversation.receiver);
      setSelectedChat({
        isGroup: false,
        conversationId: conversation.conversationId,
        receiver: conversation.receiver,
      });
      fetchMessages(conversation.conversationId); // Fetch messages for the selected conversation
    }
  };
  

  // Filter groups based on whether they have past conversations
const groupsWithConversations = groupsList.filter((group) => group.hasConversation);
const groupsWithoutConversations = groupsList.filter((group) => !group.hasConversation);

// Render groups with conversations first
const filteredGroups = [...groupsWithConversations, ...groupsWithoutConversations];
  //const filteredGroups = groupsList.filter((group) => group.is_member || group.role === "admin");

  const filteredSuggestedUsers = suggestedUsers.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 833);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex gap-24 max-[833px]:flex-col-reverse">
      {/* Sidebar */}
      <div className="w-6 max-[833px]:hidden">
        <LoggedInSideBar />
      </div>

      {/* Chat List */}
      <div className={`w-full flex ${isMobileView && selectedChat ? "hidden" : ""}`}>
        <div className="w-full">
          <div className="flex items-center justify-between max-[613px]:px-4 px-20 mt-3">
            <h1 className="font-bold text-2xl">Chats</h1>
            <img
              src={people}
              alt="people icon"
              onClick={() => setShowSuggestedUsersModal(true)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-center items-center">
            <div className="relative w-3/5 max-[600px]:w-[95%] mt-5 ml-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-[#EDEBEB] focus:ring-blue-500"
              />
              <img
                src={Search}
                alt="search icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[21.05px] h-[40px] text-gray-400"
              />
            </div>
          </div>
          <div className="flex justify-between px-8 mb-5 items-center mt-3">
            <p className="font-semibold">Messages</p>
            <img
              onClick={() => setShowFilter((prevState) => !prevState)}
              src={filter}
              alt=""
              className="cursor-pointer"
            />
            {showFilter && <ShowFilter />}
          </div>
          <div className="flex justify-between px-8 mb-5 items-center mt-3">
            <button
              onClick={() => setShowNewGroupPopup(true)}
              className="font-semibold text-blue-500"
            >
              New Group
            </button>
            <button
              onClick={() => setShowNewCommunityPopup(true)}
              className="font-semibold text-blue-500"
            >
              New Community
            </button>
          </div>
          <div className="mt-4 overflow-y-auto h-[calc(100vh-300px)]">
            {conversations.map((conversation) => (
              <Chat
                key={conversation.conversationId || conversation.groupId}
                imgSrc={
                  conversation.isGroup
                    ? "group-icon.png"
                    : conversation.receiver?.profilePicture || "default.png"
                }
                userName={
                  conversation.isGroup
                    ? conversation.group_name
                    : conversation.receiver?.username || "Unknown"
                }
                userMessage="Last message here"
                onClick={() => handleSelectChat(conversation)}
              />
            ))}

            {groupsList.map((group) => (
              <Chat
                key={group.id}
                imgSrc="group-icon.png"
                userName={group.group_name}
                userMessage={group.role === "admin" ? "You are an admin" : "You are a member"}
                onClick={() => handleGroupSelection(group)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chat Details */}
      <div className={`w-full ${isMobileView && !selectedChat ? "hidden" : ""}`}>
        {selectedChat || selectedUser ? (
          <ChatDetails
            selectedChat={selectedChat}
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            goBack={() => {
              setSelectedChat(null);
              setSelectedUser(null);
            }}
            messageRef={messageRef}
            selectedUser={selectedUser}
          />
        ) : (
          <div className="mt-4 flex justify-center items-center h-full">
            <button
              onClick={() => setShowSuggestedUsersModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Start Chat
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showNewGroupPopup && <NewGroupPopup onClose={() => setShowNewGroupPopup(false)} />}
      {showNewCommunityPopup && <NewCommunityPopup onClose={() => setShowNewCommunityPopup(false)} />}
      {showSuggestedUsersModal && (
        <SuggestedUsersModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredSuggestedUsers={suggestedUsers.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          filteredGroups={groupsList}
          handleStartChat={handleStartChat}
          handleGroupSelection={handleGroupSelection}
          onClose={() => setShowSuggestedUsersModal(false)}
        />
      )}
    </div>
  );
};

export default Chats;


function Chat({ imgSrc, userName, userMessage, onClick }) {
  return (
    <div className="flex items-center mb-8 gap-4 cursor-pointer" onClick={onClick}>
      <img className="w-20 h-20 rounded-full" src={imgSrc} alt="" />
      <div>
        <p className="font-bold">{userName}</p>
        <p>{userMessage}</p>
      </div>
    </div>
  );
}



function ChatDetails({
  selectedChat,
  messages,
  message,
  setMessage,
  handleSendMessage,
  goBack,
  messageRef,
  selectedUser,
}) {
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  const loggedInUserId = JSON.parse(localStorage.getItem("user:detail")).id;

  useEffect(() => {
    const handleResize = () => {
      setDeviceHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative" style={{ height: `${deviceHeight}px` }}>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-4 px-5">
          <img onClick={goBack} className="cursor-pointer" src={arrow} alt="" />
          <img
            className="w-20 h-20 rounded-full"
            src={selectedChat ? (selectedChat.isGroup ? "group-icon.png" : selectedChat.receiver?.profilePicture || "default.png") : selectedUser?.profilePicture || "default.png"}
            alt={selectedChat ? (selectedChat.isGroup ? "Group" : "Receiver") : "User"}
          />
          <div>
            <p className="font-bold">
              {selectedChat ? (selectedChat.isGroup ? selectedChat.group_name : selectedChat.receiver?.username || "Unknown") : selectedUser?.username || "Unknown"}
            </p>
            <p>Active 1min ago</p>
          </div>
        </div>
        <div className="flex gap-4 px-8">
          <img src={Call} className="cursor-pointer" alt="" />
          <img src={Group} className="cursor-pointer" alt="" />
        </div>
      </div>
      <hr className="h-2 bg-mainTheme mt-4 mb-3" />
      <div className="flex flex-col gap-2 p-4 overflow-y-auto h-[550px]">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isLoggedInUser = msg.senderId === loggedInUserId;
            console.log(`Message ${index}:`, { senderId: msg.senderId, loggedInUserId, isLoggedInUser }); // Log message details

            return (
              <div
                key={index}
                className={`flex ${isLoggedInUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[60%] px-3 py-2 text-white rounded-[20px] ${
                  isLoggedInUser ? "bg-orange-500" : "bg-blue-500"
                }`}>
                  {/* Display sender name for other users */}
                  {!isLoggedInUser && (
                    <p className="text-sm font-semibold text-gray-200">
                      {msg.senderName}
                    </p>
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
        )}
        <div ref={messageRef}></div>
      </div>
      {selectedChat && (
      <div className="absolute bottom-8 w-full flex justify-center"> {/* Adjusted to bottom-8 */}
      <form className="flex items-center gap-5" onSubmit={handleSendMessage}>
        <img src={files} alt="" />
        <input
          type="text"
          placeholder="Write Message"
          className="border-[2px] border-gray-400 px-28 w-full py-4 rounded-xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-mainTheme text-white px-4 py-1 rounded-lg">Send</button>
        <img src={camera} alt="" />
        <img src={sound} alt="" />
      </form>
    </div>
      )}
    </div>
  );
}
function NewGroupPopup({ onClose }) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user:detail"));
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/creategroups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          group_name: groupName,
          description,
          visibility,
          created_by: user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create group");
      }

      const data = await response.json();
      console.log("Group created successfully:", data);
      onClose();
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Group</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleCreateGroup}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Group Name</label>
            <input
              type="text"
              placeholder="Enter group name"
              className="w-full px-3 py-2 border rounded-lg"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter group description"
              className="w-full px-3 py-2 border rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Visibility</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function NewCommunityPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create New Community</h2>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Close</button>
      </div>
    </div>
  );
}s