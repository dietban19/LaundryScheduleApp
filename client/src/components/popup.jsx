import { set } from "date-fns";
import React, { useState } from "react";
import styles from "../styles/popupContent.module.css";
import BookingPopup from "./bookingPopup";
import { format } from "date-fns";
import dayjs from "dayjs";
const Popup = ({
  selectedDate,
  onClose,
  dayRange,
  month,
  bookedDate,
  setBookedDate,
  handleBook,
  bookedUsers,
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

  const isIncluded = bookedUsers.some((customer) => {
    // selectedDate <= new Date(customer.dates.endDay);
    customer.dates.endDay ===
      "Thu Jul 06 2023 00:00:00 GMT-0600 (Mountain Daylight Time)";
    // &&
    //   selectedDate <= new Date(customer.dates.endDay);
  });
  const isIncludeds = bookedUsers.find(
    (customer) =>
      selectedDate <= new Date(customer.dates.endDay) &&
      selectedDate >= new Date(customer.dates.startDay)
  );

  // const filteredObject = bookedUsers.find((obj) => {
  //   const startDay = new Date(obj.dates.startDay);
  //   return startDay.toDateString() === selectedDate.toDateString();
  // });
  // const bookedBy = bookedUsers.some((customer) => {
  //   const bookedName = customer.firstName + " " + customer.lastName;
  //   return bookedName;
  // });
  const bookedBy = bookedUsers.find(
    (customer) =>
      selectedDate <= new Date(customer.dates.endDay) &&
      selectedDate >= new Date(customer.dates.startDay)
  );
  const isBooked =
    bookedDate.startDate !== "" && bookedDate.endDate !== ""
      ? selectedDate >= new Date(bookedDate.startDate) &&
        selectedDate <= new Date(bookedDate.endDate)
        ? true
        : false
      : false;

  function tester() {
    console.log(bookedUsers);
    // console.log(selectedDate <= new Date(bookedUsers[1].dates.endDay));
    // console.log(selectedDate);
    // // const firstName = filteredObject;
    // //  ? filteredObject.firstName : "";
    // // console.log("SER", filteredObject);
    // console.log("booked?", isBooked);
    console.log(isIncludeds);
    console.log(bookedBy.firstName);
  }
  function formatDate(date) {
    const day = dayjs(date).format("dddd");
    const month = dayjs(date).format("MMMM");
    const dayNum = dayjs(date).format("D");
    const year = dayjs(date).format("YYYY");

    return (
      <>
        {day}, {month}, {dayNum}, {year}{" "}
      </>
    );
  }
  return (
    <div className={styles.popup}>
      {/* <button onClick={tester}>Button</button> */}

      <div className={styles.popupContent}>
        <button onClick={tester}>BUT</button>
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
            {isBooked ? (
              <>
                <h2 className={styles.isBooked__title}>Success!</h2>

                <div className={styles.isBooked__description}>
                  <h3 className={styles.isBooked__description__title}>
                    You have booked:
                  </h3>
                  <div className={styles.isBooked__dates}>
                    From: {formatDate(bookedDate.startDate)}
                  </div>
                  <div className={styles.isBooked__dates}>
                    To: {formatDate(bookedDate.endDate)}
                  </div>
                </div>
              </>
            ) : isIncludeds ? (
              <>
                <div className={styles.takenTitle}>
                  This Date has been booked by:
                </div>
                <div className={styles.takenName}>{bookedBy.firstName}</div>
              </>
            ) : (
              <>
                <div className={styles.popUpBody__header}>Available</div>
                <button className={styles.bookNowButton} onClick={handleBook}>
                  Book Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
