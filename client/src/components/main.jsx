import React from "react";
import styles from "../styles/main.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "./calendar";
function main({ form, setForm, handleLogOut }) {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainContent}>
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
