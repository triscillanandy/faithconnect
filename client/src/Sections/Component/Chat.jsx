import React, { useEffect, useState, useRef } from "react";
import filter from "./chat-images/filter.png";
import people from "./chat-images/people.png";
import Call from "./chat-images/Call.png";
import Group from "./chat-images/Group.png";
import arrow from "./chat-images/arrow.png";
import Search from "./chat-images/Search.png";
import camera from "./chat-images/camera.png";
import sound from "./chat-images/sound.png";
import { useNavigate } from "react-router-dom";
import files from "./chat-images/files.png";
import { io } from "socket.io-client";
import following from "./chat-images/following.png";
import chat from "./chat-images/chat.png";
import groups from "./chat-images/groups.png";
import no from "./chat-images/no.png";
import blocked from "./chat-images/blocked.png";
import LoggedInSideBar from "./LoggedInSideBar";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showNewGroupPopup, setShowNewGroupPopup] = useState(false);
  const [showNewCommunityPopup, setShowNewCommunityPopup] = useState(false);
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
          "Authorization": `Bearer ${token}`
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
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await res.json();
      setGroupsList(data.groups || []);
    };

    fetchConversations();
    fetchGroups();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", JSON.parse(localStorage.getItem("user:detail")).id);
      console.log("Joining room:", JSON.parse(localStorage.getItem("user:detail")).id);
      socket.on("get-users", (activeUsers) => {
        console.log("Active users:", activeUsers);
      });

      socket.on("receive-message", (data) => {
        setMessages((prev) => [...prev, { text: data.message, senderId: data.senderId }]);
      });

      socket.on("receive-group-message", (data) => {
        if (data.groupId === selectedChat?.groupId) {
          setMessages((prev) => [...prev, { text: data.message, senderId: data.senderId }]);
        }
      });
    }
  }, [socket, selectedChat]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async (conversationId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/messages/${conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await res.json();
    setMessages(data);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const user = JSON.parse(localStorage.getItem("user:detail"));
    const token = localStorage.getItem("token");
    const newMessage = selectedChat.isGroup
      ? {
          groupId: selectedChat.groupId,
          senderId: user.id,
          message,
        }
      : {
          conversationId: selectedChat.conversationId,
          senderId: user.id,
          receiverId: selectedUser.id,
          message,
        };

    socket.emit(selectedChat.isGroup ? "sendGroupMessage" : "sendMessage", newMessage);
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/${selectedChat.isGroup ? "group-messages" : "messages"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newMessage),
      }
    );

    setMessages((prev) => [...prev, { text: message, senderId: user.id }]);
    setMessage("");
  };

  const fetchGroupMessages = async (groupId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/group-messages/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setMessages(data);
  };

  const handleSelectChat = (conversation) => {
    setSelectedChat(conversation);
    if (conversation.isGroup) {
      fetchGroupMessages(conversation.groupId);
    } else {
      setSelectedUser(conversation.receiver);
      fetchMessages(conversation.conversationId);
    }
  };



// Filter groups where the user is a member or admin
const filteredGroups = groupsList.filter(group => group.is_member || group.role === 'admin');

return (
  <div className="flex gap-24 max-[833px]:flex-col-reverse">
    <LoggedInSideBar />
    <div className="w-full flex">
      <div className="w-1/3">
        <div>
          <div className="flex items-center justify-between max-[613px]:px-4 px-20 mt-3">
            <h1 className="font-bold text-2xl">Chats</h1>
            <img src={people} alt="people icon" />
          </div>
          <div className="flex justify-center items-center">
            <div className="relative w-3/5 max-[600px]:w-[95%] mt-5 ml-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-[#EDEBEB] focus:ring-blue-500 flex flex-col justify-center"
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
            <button onClick={() => setShowNewGroupPopup(true)} className="font-semibold text-blue-500">New Group</button>
            <button onClick={() => setShowNewCommunityPopup(true)} className="font-semibold text-blue-500">New Community</button>
          </div>
          <div className="mt-4">
            {conversations.map((conversation) => (
              <Chat
                key={conversation.conversationId || conversation.groupId}
                imgSrc={
                  conversation.isGroup
                    ? "group-icon.png"
                    : conversation.receiver?.profilePicture || "default.png"
                }
                userName={conversation.isGroup ? conversation.group_name : conversation.receiver?.username || "Unknown"}
                userMessage="Last message here"
                onClick={() => handleSelectChat(conversation)}
              />
            ))}
            {filteredGroups.map((group) => (
              <Chat
                key={group.id}
                imgSrc="group-icon.png"
                userName={group.group_name}
                userMessage={group.role === 'admin' ? 'You are an admin' : 'You are a member'}
                onClick={() => handleSelectChat({ isGroup: true, groupId: group.id, group_name: group.group_name })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-2/3">
        {selectedChat && (
          <ChatDetails
            selectedChat={selectedChat}
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            goBack={() => setSelectedChat(null)}
            messageRef={messageRef}
          />
        )}
      </div>
    </div>

    {showNewGroupPopup && <NewGroupPopup onClose={() => setShowNewGroupPopup(false)} />}
    {showNewCommunityPopup && <NewCommunityPopup onClose={() => setShowNewCommunityPopup(false)} />}
  </div>
);
};
export default Chat;

function ShowFilter() {
  return (
    <div>
      <h1 className="mb-1">Filter chats by</h1>
      <FilterTags imgSrc={chat} filterMessage={"Unread"} />
      <FilterTags imgSrc={groups} filterMessage={"groups"} />
      <FilterTags imgSrc={following} filterMessage={"following"} />
      <FilterTags imgSrc={no} filterMessage={"not following"} />
      <FilterTags imgSrc={blocked} filterMessage={"blocked users"} />
    </div>
  );
}

function FilterTags({ imgSrc, filterMessage }) {
  return (
    <div className="flex gap-2 mb-2 items-center cursor-pointer">
      <img src={imgSrc} className="w-[15px] h-[15.65px]" alt="" />
      <p className="capitalize">{filterMessage}</p>
    </div>
  );
}

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
// function ChatDetails({
//   selectedChat,
//   messages,
//   message,
//   setMessage,
//   handleSendMessage,
//   goBack,
//   messageRef,
// }) {
//   const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
//   const loggedInUserId = JSON.parse(localStorage.getItem("user:detail")).id;

//   useEffect(() => {
//     const handleResize = () => {
//       setDeviceHeight(window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div className="relative" style={{ height: `${deviceHeight}px` }}>
//       <div className="flex justify-between items-center mt-5">
//         <div className="flex items-center gap-4 px-5">
//           <img onClick={goBack} className="cursor-pointer" src={arrow} alt="" />
//           <img
//             className="w-20 h-20 rounded-full"
//             src={selectedChat.isGroup ? "group-icon.png" : selectedChat.receiver?.profilePicture || "default.png"}
//             alt={selectedChat.isGroup ? "Group" : "Receiver"}
//           />
//           <div>
//             <p className="font-bold">{selectedChat.isGroup ? selectedChat.group_name : selectedChat.receiver?.username || "Unknown"}</p>
//             <p>Active 1min ago</p>
//           </div>
//         </div>
//         <div className="flex gap-4 px-8">
//           <img src={Call} className="cursor-pointer" alt="" />
//           <img src={Group} className="cursor-pointer" alt="" />
//         </div>
//       </div>
//       <hr className="h-2 bg-mainTheme mt-4 mb-3" />
//       <div className="flex flex-col gap-2 p-4 overflow-y-auto h-[550px]">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.senderId === loggedInUserId ? "justify-end" : "justify-start"
//             }`}
//           >
//             <p
//               className={`max-w-[60%] px-3 py-2 text-white rounded-[20px] ${
//                 msg.senderId === loggedInUserId ? "bg-orange-500" : "bg-blue-500"
//               }`}
//             >
//               {msg.text}
//             </p>
//           </div>
//         ))}
//         <div ref={messageRef}></div>
//       </div>
//       <div className="absolute bottom-0 w-full flex justify-center">
//         <form className="flex items-center gap-5" onSubmit={handleSendMessage}>
//           <img src={files} alt="" />
//           <input
//             type="text"
//             placeholder="Write Message"
//             className="border-[2px] border-gray-400 px-28 w-full py-4 rounded-xl"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button className="bg-mainTheme text-white px-4 py-1 rounded-lg">Send</button>
//           <img src={camera} alt="" />
//           <img src={sound} alt="" />
//         </form>
//       </div>
//     </div>
//   );
// }
function ChatDetails({
  selectedChat,
  messages,
  message,
  setMessage,
  handleSendMessage,
  goBack,
  messageRef,
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
            src={selectedChat.isGroup ? "group-icon.png" : selectedChat.receiver?.profilePicture || "default.png"}
            alt={selectedChat.isGroup ? "Group" : "Receiver"}
          />
          <div>
            <p className="font-bold">{selectedChat.isGroup ? selectedChat.group_name : selectedChat.receiver?.username || "Unknown"}</p>
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === loggedInUserId ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`max-w-[60%] px-3 py-2 text-white rounded-[20px] ${
                msg.senderId === loggedInUserId ? "bg-orange-500" : "bg-blue-500"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={messageRef}></div>
      </div>
      <div className="absolute bottom-0 w-full flex justify-center">
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
    </div>
  );
}

function NewGroupPopup({ onClose }) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public"); // Default visibility
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
      onClose(); // Close the popup after successful creation
      navigate("/home"); // Navigate to the home page
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
        {/* Add form fields for creating a new community */}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Close</button>
      </div>
    </div>
  );
}