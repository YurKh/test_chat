import React, { useState } from "react";
import PropTypes from "prop-types";

import Input from "./Input";

import { ReactComponent as SendIcon } from "../../../assets/send-msg.svg";

import styles from "./ChatInput.module.scss";

const ChatInput = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const onChange = event => {
    const value = event.target.value;

    setValue(value);
  };

  const onEnter = () => {
    value && onSubmit(value.trim());
    setValue("");
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey) {
      event.preventDefault();
      onEnter();
    }
  };

  return (
    <div
      className={styles.chatInputWrapper}
      onKeyDown={handleKeyDown}
      data-testid="chatInput"
    >
      <Input onEnter={onEnter} onChange={onChange} value={value} />
      <div className={styles.iconsWrapper}>
        <SendIcon className={styles.icon} onClick={onEnter} />
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ChatInput;
