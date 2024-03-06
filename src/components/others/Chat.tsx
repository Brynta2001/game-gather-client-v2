'use client'
import React, { useState, useEffect } from 'react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Establish a connection with the WebSocket server
    const newSocket = new WebSocket('ws://your-websocket-server.com');

    // Listen for the connection event
    newSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Listen for the message event
    newSocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Listen for the close event
    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(newSocket);

    // Clean up the socket when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Send the message to the WebSocket server
      socket?.send(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <h1 className="text-3xl font-bold mb-4 text-center">Chat Room</h1>
      <div className="flex-grow overflow-y-auto bg-gray-200 p-4 mx-auto w-full max-w-7xl rounded-lg">
        <div className="grid grid-cols-1 gap-4">
          {messages.map((message, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow rounded-2xl">
              {message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex p-4 bg-gray-300 w-full max-w-6xl mx-auto rounded-lg"> 
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
          className="flex-grow rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-700"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;