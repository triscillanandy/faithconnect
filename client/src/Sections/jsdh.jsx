import React, { useEffect, useState, useRef, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import LoggedInSideBar from "./LoggedInSideBar";
import UserProfileComponent from "./UserProfileComponent";
import ChatDetails from "./ChatDetails";
import Chats from "./Chats";
import AuthContext from "./AuthContext";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConversations();
  }, [user._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex">
      <div className="w-[20%]">
        <LoggedInSideBar showSideBar={true} />
        <div>
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Chats conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[60%]">
        {currentChat ? (
          <ChatDetails
            chat={currentChat}
            messages={messages}
            onSubmit={handleSubmit}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            scrollRef={scrollRef}
          />
        ) : (
          <p>Select a chat to start messaging</p>
        )}
      </div>
      <div className="w-[20%]">
        <UserProfileComponent onlineUsers={onlineUsers} />
      </div>
    </div>
  );
}
