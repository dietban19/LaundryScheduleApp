import styles from "../styles/main.module.css";
import React from "react";

function loading() {
  return (
    <div>{!form.firstName ? <div className={styles.loading}></div> : null}</div>
  );
}

export default loading;
