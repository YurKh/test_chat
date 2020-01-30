import React from "react";

import ChatWindow from "./components/ChatWindow";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <ChatWindow />
    </div>
  );
}

export default App;
