import React from "react";
import styles from "../styles/main.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
function main({ form, setForm, handleLogOut }) {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainContent}>
        <div className={styles.main}>{form.firstName}</div>
        <div className={styles.main}>{form.lastName}</div>
        <div className={styles.main}>{form.bday}</div>
        <div className={styles.main}>{form.email}</div>
        <div className={styles.main}>{form.password}</div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
      <NavBar />
    </div>
  );
}

export default main;
