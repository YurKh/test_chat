import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Message from "./Message";

import { ReactComponent as ArrowDown } from "../../../assets/arrow-down.svg";

import styles from "./Messages.module.scss";

const Messages = ({ messages }) => {
  const msgsWrapperRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    handleScroll();
  }, []);

  const scrollToBottom = () => {
    const { current } = msgsWrapperRef;

    current &&
      current.scroll({
        top: current.scrollHeight,
        behavior: "smooth"
      });
  };

  const renderMessages = () => {
    return messages.map((message, index) => {
      return (
        <Message
          message={message}
          key={index}
          isRight={message.author === "1"}
        />
      );
    });
  };

  const handleScroll = () => {
    const { current } = msgsWrapperRef;
    const { scrollTop, scrollHeight, clientHeight } = current || {};

    if (scrollHeight - scrollTop - 2 * clientHeight >= 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <div
      className={styles.chatMessagesWrapper}
      ref={msgsWrapperRef}
      data-testid="chatMessages"
      onScroll={handleScroll}
    >
      {messages.length ? (
        renderMessages()
      ) : (
        <Message message={{ text: "No messages yet!" }} isInfo />
      )}
      {isScrolled && (
        <div className={styles.downButton} onClick={scrollToBottom}>
          <ArrowDown className={styles.arrowDown} />
          <div className={styles.pin}></div>
        </div>
      )}
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.array
};

Messages.defaultProps = {
  messages: []
};

export default Messages;
