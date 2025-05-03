"use client";

import styles from "./page.module.css";
import React from "react";

export default function Home() {
  const [text, setText] = React.useState("hello!");

  const delayedClose = () => {
    setText("goodbye!");

    setTimeout(() => {
      history.back();
    }, 500);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title} onClick={delayedClose}>
        {text}
      </h1>
    </div>
  );
}
