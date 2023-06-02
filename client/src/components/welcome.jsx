import React from "react";
import styles from "../styles/welcome.module.css";
import { useNavigate } from "react-router-dom";

export default function welcome() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <div className={styles.card}>
      <div className={styles.welcomeHeaderContainer}>
        <div className={styles.headerContent}>
          <button className={styles.arrow}>
            <span></span>
          </button>

          <h2 className={styles.headerTitle}> Log in or sign up</h2>
        </div>
        <span className={styles.line}></span>
      </div>

      <div className={styles.welcomeContent}>
        <h1 className={styles.welcomeTo}>
          Welcome To The Laundry Scheduling App
        </h1>
        <button
          className={styles.selectButton}
          onClick={() => handleClick("/signUp")}
        >
          Sign Up
        </button>
        <div className={styles.haveAcc}>Have an Account?</div>
        <button
          className={styles.selectButton}
          onClick={() => handleClick("/login")}
        >
          Log In
        </button>
      </div>
    </div>
  );
}
