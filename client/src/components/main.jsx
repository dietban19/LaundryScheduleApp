import React from "react";
import styles from "../styles/main.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { useRecords } from "../helpers/useRecords";

import Calendar from "./calendar";
function main({ form, setForm, handleLogOut }) {
  const records = useRecords();
  //   function handleClick() {
  //     records.fetchRecords();
  //     console.log("pdate");
  //   }
  function handleTest() {
    console.log(records.records);
  }
  //   useEffect(() => {
  //     records.fetchRecords();
  //   });
  //   useEffect(() => {
  //     console.log("calling");
  //     records.fetchRecords();
  //     console.log("123", records.records);
  //   }, []);
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainContent}>
        {/* <button onClick={handleClick}>Press here</button>
        <button onClick={handleTest}>Test</button> */}
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider> */}
        <div className={styles.mainHeader}>Welcome, {form.firstName} </div>
        <div className={styles.mainCalendar}>
          <Calendar />
        </div>

        {/* <div className={styles.main}>{form.firstName}</div>
        <div className={styles.main}>{form.lastName}</div>
        <div className={styles.main}>{form.bday}</div>
        <div className={styles.main}>{form.email}</div>
        <div className={styles.main}>{form.password}</div> */}
        {/* <button onClick={handleLogOut}>Logout</button> */}
      </div>
      <NavBar />
    </div>
  );
}

export default main;
