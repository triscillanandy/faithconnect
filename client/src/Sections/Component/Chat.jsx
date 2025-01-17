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
import following from "./chat-images/following.png";
import chat from "./chat-images/chat.png";
import groups from "./chat-images/groups.png";
import no from "./chat-images/no.png";
import blocked from "./chat-images/blocked.png";
import LoggedInSideBar from "./LoggedInSideBar";
const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
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

    fetchConversations();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", JSON.parse(localStorage.getItem("user:detail")).id);
      socket.on("get-users", (activeUsers) => {
        console.log("Active users:", activeUsers); // Optional: Show active users
      });
      socket.on("receive-message", (data) => {
        setMessages((prev) => [...prev, { text: data.message, senderId: data.senderId }]);
      });
    }
  }, [socket]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  const fetchMessages = async (conversationId,) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/messages/${conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    console.log(res);
    const data = await res.json();
    setMessages(data);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const user = JSON.parse(localStorage.getItem("user:detail"));
    const token = localStorage.getItem("token");
    const newMessage = {
      conversationId: selectedChat.conversationId,
      senderId: user.id, // Sender's userId
      receiverId: selectedUser.id, // Receiver's userId
      message,
     
    };
  
    // Send the message through the socket
    socket.emit("sendMessage", newMessage);
    console.log(newMessage);
    // socket.emit("sendMessage", newMessage);

    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newMessage),
    });
    console.log(newMessage);
    //console.log("Message sent:", body);

    setMessages((prev) => [...prev, { text: message, senderId: user.id }]);
    setMessage("");
  };

  const handleSelectChat = (conversation) => {
    setSelectedChat(conversation);
  setSelectedUser(conversation.receiver);
  fetchMessages(conversation.conversationId);
  // if (socket) {
  //   socket.emit("joinRoom", conversation.conversationId); // Join the conversation room
  //   console.log(`Joined room: ${conversation.conversationId}`);
  // }
  };

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
            <div className="mt-4">
              {conversations.map((conversation) => (
                <Chat
                key={conversation.conversationId}
                imgSrc={conversation.receiver?.profilePicture || "default.png"}
                userName={conversation.receiver?.username || "Unknown"}
                userMessage="Last message here" // Update with last message logic if needed
                  onClick={() => handleSelectChat(conversation)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/3">
         

          {selectedChat && (
            <ChatDetails
              chat={selectedChat}
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
    </div>
  );
};

export default Chats;

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

function ChatDetails({
  chat,
  messages,
  message,
  setMessage,
  handleSendMessage,
  goBack,
  messageRef,
}) {
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);

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
              src={chat.receiver?.profilePicture || "default.png"}
              alt="Receiver"
            />
          <div>
          <p className="font-bold">{chat.receiver?.username || "Unknown"}</p>
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
          <p
            key={index}
            className={`max-w-[60%] px-3 py-2 text-white rounded-[20px] ${
              msg.sender === "sender" ? "bg-mainTheme self-end" : "bg-[#373E4E] self-start"
            }`}
          >
            {msg.text}
          </p>
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
