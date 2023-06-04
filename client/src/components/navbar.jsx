import React from "react";
import styles from "../styles/main.module.css";

export default function navbar() {
  return (
    <div>
      <div className={styles.nav}>
        <div className="home">Home</div>
        <div className="profile">Profile</div>
      </div>
    </div>
  );
}
