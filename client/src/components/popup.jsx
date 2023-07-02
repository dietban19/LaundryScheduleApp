import { set } from "date-fns";
import React, { useState } from "react";
import styles from "../styles/popupContent.module.css";
import BookingPopup from "./bookingPopup";
import dayjs from "dayjs";
const Popup = ({
  selectedDate,
  onClose,
  dayRange,
  month,
  bookedDate,
  setBookedDate,
  showBookPopup,
  setShowBookPopup,
  handleBook,
}) => {
  const renderDates = () => {
    const { dayOne, dayLast } = dayRange.dates;
    const range = Array.from(
      { length: dayLast - dayOne + 1 },
      (_, index) => dayOne + index
    ).map((date) => (date > 0 ? date : null));

    return (
      <tr>
        {range.map((date, index) => {
          const isSelected =
            parseInt(date, 10) ===
            parseInt(dayjs(selectedDate).format("D"), 10); // Check if the date equals selectedDate
          const dateClass = `${styles.dateContainer} ${
            isSelected ? styles.selectedDate : ""
          }`; // Apply a CSS class if it's the selected date
          return (
            <td key={index} className={`${dateClass}`}>
              {date}
            </td>
          );
        })}
      </tr>
    );
  };
  function tester() {
    const { dayOne, dayLast } = dayRange.dates;
    const range = Array.from(
      { length: dayLast - dayOne + 1 },
      (_, index) => dayOne + index
    ).map((date) => (date > 0 ? date : null));
  }
  console.log("DATES");
  return (
    <div className={styles.popup}>
      {/* <button onClick={tester}>Button</button> */}

      <div className={styles.popupContent}>
        <button onClick={onClose} className={styles.close}></button>
        {/* <h3>Selected Date: {selectedDate.toDateString()}</h3> */}
        <div className={styles.popupBody}>
          <h1>{month}</h1>
          {/* <h2> {dayRange.lastDay}</h2> */}
          <table className={styles.popupTable}>
            <thead className={styles.popupTable__head}>
              <tr>
                <th>S</th>
                <th>M</th>
                <th>T</th>
                <th>W</th>
                <th>Th</th>
                <th>F</th>
                <th>S</th>
              </tr>
            </thead>
            <tbody>{renderDates()}</tbody>
          </table>
          <div className={styles.popUpBodyContainer}>
            <div className={styles.popUpBody__header}>Available</div>
            <button className={styles.bookNowButton} onClick={handleBook}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
