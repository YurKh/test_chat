import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./Message.module.scss";

const Message = ({ message, isRight, isInfo }) => {
  const { text } = message;

  return (
    <div
      className={cn(
        styles.messageWrapper,
        isRight && !isInfo && styles.rightMessageWrapper,
        isInfo && styles.infoMessageWrapper
      )}
    >
      <div className={styles.messageBody}>
        <div
          className={cn(
            styles.messageText,
            isRight && !isInfo && styles.rightMessageText,
            isInfo && styles.infoMessageText
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired,
  isRight: PropTypes.bool,
  isInfo: PropTypes.bool
};

export default Message;
