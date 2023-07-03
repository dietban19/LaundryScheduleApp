import React from "react";
import styles from "../styles/main.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { useRecords } from "../helpers/useRecords";
import BookingPopup from "./bookingPopup";
import Calendar from "./calendar";
function main({ form, setForm, handleLogOut, userRecord, setUserRecord }) {
  const [bookedDate, setBookedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);
  const [logged, setLogged] = useState(false);
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
  // const bookedUsers = records.records.filter(
  //   (customer) => customer.dates.startDay !== "" && customer.dates.endDay !== ""
  // );

  const [bookedUsers, setBookedUsers] = useState();
  const [innerUser, setInnerUser] = useState();
  async function asyncFunc() {
    await records.fetchRecords();
    const myRec = records;
    console.log("claled async");
  }
  useEffect(() => {
    // console.log("THIS IS HERE", records);
    // console.log(1234, userRecord);
    callRecords();
  }, [userRecord]);
  function callRecords() {
    // console.log("CALING");
    // console.log(1, userRecord);
    // console.log(2, records);
    if (records.records.length <= 0) {
      if (!userRecord) {
        // console.log("EMPTY");
        // asyncFunc();
        // console.log("WIAT");
        // setTimeout(() => {
        //   // window.location.reload();
        // }, 4000);
        return;
      }
      const booked = userRecord.records.filter(
        (customer) =>
          customer.dates.startDay !== "" && customer.dates.endDay !== ""
      );

      setBookedUsers(booked);
    } else {
      // console.log("NOTTT");
      // console.log(records);
      const booked = records.records.filter(
        (customer) =>
          customer.dates.startDay !== "" && customer.dates.endDay !== ""
      );

      setBookedUsers(booked);
    }
  }
  // useEffect(() => {
  //   console.log("HAaaaaaa");
  //   callRecords();
  // }, []);
  // const filteredArray = existingDates.filter(
  //   ({ id, dates }) => id !== ""
  //   // && dates !==
  // );

  function handleTest() {
    console.log(bookedUsers);
  }
  // console.log(bookedUsers);
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
          bookedUsers={bookedUsers}
          selectedDate={selectedDate}
        />
      )}
      {/* {!form.firstName ? <div className={styles.loading}></div> : null} */}
      <div className={styles.mainContent}>
        <div className={styles.mainHeader}>Welcome, {form.firstName} </div>

        {bookedUsers && (
          <div className={styles.mainCalendar}>
            <Calendar
              bookedDate={bookedDate}
              setBookedDate={setBookedDate}
              showBookPopup={showBookPopup}
              setShowBookPopup={setShowBookPopup}
              handleBook={handleBook}
              bookedUsers={bookedUsers}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setClose={handlePopupFalse}
              form={form}
            />
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
}

export default main;
