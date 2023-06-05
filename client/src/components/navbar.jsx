import React from "react";
import styles from "../styles/main.module.css";
import { Link } from "react-router-dom";
import Pic from "../assets/images/icon-profile-pic.svg";
import { IoMdPerson } from "react-icons/io";
import { FaHome } from "react-icons/fa";
export default function navbar() {
  return (
    <div>
      <div className={styles.nav}>
        <Link to="/home">
          <FaHome className={styles.iconImage} size={24} />
        </Link>
        <Link to="/profile">
          <IoMdPerson className={styles.iconImage} size={24} />
          {/* <div className={styles.profile}>Profile</div> */}
        </Link>
      </div>
    </div>
  );
}
