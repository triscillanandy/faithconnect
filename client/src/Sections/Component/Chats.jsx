import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Chat({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [conversation, currentUser]);

  return (
    <div className="chat p-4 border-b cursor-pointer hover:bg-gray-100">
      <h4 className="font-bold">{user?.username || "Loading..."}</h4>
      <p className="text-sm text-gray-500">{conversation.lastMessage}</p>
    </div>
  );
}
