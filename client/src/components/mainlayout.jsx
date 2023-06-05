import React from "react";
import Main from "./main";
import NavBar from "./navbar";
import styles from "../styles/main.module.css";
function mainLayout({ form, setForm }) {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainContent}>
        <Main form={form} setForm={setForm} />
      </div>
      <NavBar />
    </div>
  );
}

export default mainLayout;
