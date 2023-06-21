import { set } from "date-fns";
import React, { useState } from "react";
import styles from "../styles/popupContent.module.css";
import BookingPopup from "./bookingPopup";
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
        {range.map((date, index) => (
          <td key={index}>{date}</td>
        ))}
      </tr>
    );
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button onClick={onClose}>Close</button>
        {/* <h3>Selected Date: {selectedDate.toDateString()}</h3> */}
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
  );
};

export default Popup;
