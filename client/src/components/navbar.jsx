import React from "react";
import styles from "../styles/main.module.css";
import { Link } from "react-router-dom";
export default function navbar() {
  return (
    <div>
      <div className={styles.nav}>
        <Link to="/main">
          <div className="home">Home</div>
        </Link>
        <Link to="/profile">
          <div className="profile">Profile</div>
        </Link>
      </div>
    </div>
  );
}
