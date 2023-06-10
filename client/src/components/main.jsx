import React from "react";
import styles from "../styles/main.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { useRecords } from "../helpers/useRecords";

import Calendar from "./calendar";
function main({ form, setForm, handleLogOut }) {
  const [isLoading, setIsLoading] = useState(true);
  const records = useRecords();

  function handleTest() {
    console.log(records.records);
  }
  useEffect(() => {
    if (form) {
      console.log("YESYESYES");
    }
  });
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div className={styles.mainPage}>
      {!form.firstName ? <div className={styles.loading}></div> : null}
      <div className={styles.mainContent}>
        <div className={styles.mainHeader}>Welcome, {form.firstName} </div>
        <div className={styles.mainCalendar}>
          <Calendar />
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default main;
