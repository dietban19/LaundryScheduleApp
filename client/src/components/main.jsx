import React from "react";
import styles from "../styles/main.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { useRecords } from "../helpers/useRecords";
import BookingPopup from "./bookingPopup";
import Calendar from "./calendar";
function main({ form, setForm, handleLogOut }) {
  const [bookedDate, setBookedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);
  const records = useRecords();
  const navigate = useNavigate();
  const [showBookPopup, setShowBookPopup] = useState(false);

  const handleBook = () => {
    setShowBookPopup(true);
    setIsBlurred(true);
  };
  const handlePopupFalse = () => {
    setShowBookPopup(false);
  };

  useEffect(() => {
    if (!form.firstName) {
      navigate("/");
    }
  });
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div
      className={
        isBlurred ? `${styles.mainPage} ${styles.blur}` : `${styles.mainPage}`
      }
    >
      {showBookPopup && (
        <BookingPopup
          setClose={handlePopupFalse}
          bookedDate={bookedDate}
          setBookedDate={setBookedDate}
          form={form}
        />
      )}
      {/* {!form.firstName ? <div className={styles.loading}></div> : null} */}
      <div className={styles.mainContent}>
        <div className={styles.mainHeader}>Welcome, {form.firstName} </div>
        <div className={styles.mainCalendar}>
          <Calendar
            bookedDate={bookedDate}
            setBookedDate={setBookedDate}
            showBookPopup={showBookPopup}
            setShowBookPopup={setShowBookPopup}
            handleBook={handleBook}
          />
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default main;
