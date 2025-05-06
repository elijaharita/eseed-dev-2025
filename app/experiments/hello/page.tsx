"use client";

import styles from "./page.module.css";
import React from "react";

export default function Home() {
  const [text, setText] = React.useState("hello!");

  const delayedClose = () => {
    setText("goodbye!");

    setTimeout(() => {
      if (history.length > 1) {
        history.back();
      } else {
        if (Math.random() > 0.5) {
          window.location.href = "https://x.com/elijaharita";
        } else {
          window.location.href = "https://bsky.app/profile/eilj.bsky.social";
        }
      }
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
