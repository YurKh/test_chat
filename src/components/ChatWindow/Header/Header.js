import React from "react";

import styles from "./Header.module.scss";

const Header = props => {
  return (
    <div className={styles.chatHeaderWrapper} data-testid="chatHeader">
      Header
    </div>
  );
};

export default Header;
