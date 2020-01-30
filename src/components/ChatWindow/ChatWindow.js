import React, { useState } from "react";

import Messages from "./Messages";
import ChatInput from "./ChatInput";
import Header from "./Header";

import styles from "./ChatWindow.module.scss";

const mockMessages = [
  {
    author: "1",
    time: "",
    text: "10",
    id: 0
  },
  {
    author: "1",
    time: "",
    text: "11",
    id: 1
  },
  {
    author: "2",
    time: "",
    text: "22",
    id: 2
  },
  {
    author: "2",
    time: "",
    text: "23",
    id: 3
  },
  {
    author: "1",
    time: "",
    text: "14",
    id: 4
  }
];

const ChatWindow = props => {
  const [messages, setMessages] = useState([
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages,
    ...mockMessages
  ]);

  const addMessage = text => {
    setMessages([...messages, { author: "1", text }]);
  };

  return (
    <div className={styles.chatWindowWrapper} data-testid="chatWindow">
      <Header />

      <Messages messages={messages} />

      <ChatInput onSubmit={addMessage} />
    </div>
  );
};

export default ChatWindow;
