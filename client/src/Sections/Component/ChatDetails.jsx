import React from "react";

export default function ChatDetails({
  chat,
  messages,
  onSubmit,
  newMessage,
  setNewMessage,
  scrollRef,
}) {
  return (
    <div className="chat-details w-full flex flex-col h-full p-4 border rounded-lg">
      <div className="messages overflow-y-auto flex-grow">
        {messages.map((msg, index) => (
          <div
            key={index}
            ref={scrollRef}
            className={`message p-2 my-1 ${
              msg.sender === chat.userId
                ? "text-right bg-blue-500 text-white"
                : "text-left bg-gray-200"
            } rounded-md`}
          >
            <p>{msg.text}</p>
            <span className="text-xs text-gray-600">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <form
        className="input-container mt-4 flex items-center gap-2"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-lg"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="send-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
