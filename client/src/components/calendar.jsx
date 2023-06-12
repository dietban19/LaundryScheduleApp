import React, { useState } from "react";
import styles from "../styles/calendar.module.css";
import dayjs from "dayjs";
import Popup from "./popup";
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };
  const handlePopupClose = () => {
    setShowPopup(false);
  };
  const renderCalendar = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendarDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(currentYear, currentMonth, i);
      const isCurrentDay = i === currentDate.getDate();
      const isSelected =
        day.toDateString() === (selectedDate && selectedDate.toDateString());

      calendarDays.push(
        <div
          key={i}
          className={styles.calendar__day}
          onClick={() => handleDateClick(day)}
        >
          <div
            className={`${styles.myDay} ${
              isCurrentDay ? `${styles.currentDay}` : ""
            } ${isSelected ? `${styles.selected}` : ""}`}
          >
            {i}
          </div>
        </div>
      );
    }

    const blanks = [];
    for (let i = 0; i < startingDay; i++) {
      blanks.push(<td key={`blank_${i}`} className="calendar-day empty"></td>);
    }

    const totalSlots = [...blanks, ...calendarDays];
    const rows = [];
    let cells = [];

    totalSlots.forEach((slot, index) => {
      if (index % 7 !== 0) {
        cells.push(slot);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(slot);
      }

      if (index === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((slot, slotIndex) => (
          <td className={styles.dataSOMETHING} key={slotIndex}>
            {slot}
          </td>
        ))}
      </tr>
    ));
  };

  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={styles.calendarContainer}>
      {showPopup && (
        <div className={styles.popup}>
          <Popup selectedDate={selectedDate} onClose={handlePopupClose} />
        </div>
      )}
      <div className={styles.headers}>
        <h2 className={styles.headers__text}>
          {selectedDate ? "Selected Date" : "Today's Date"}
        </h2>
        <div className={styles.headers__date}>
          <div className={styles.headers__date__day}>
            {selectedDate
              ? dayjs(selectedDate).format("DD")
              : dayjs().format("DD")}
          </div>
          <div className={styles.headers__date__month}>
            {selectedDate
              ? months[dayjs(selectedDate).format("M") - 1]
              : months[dayjs().format("M") - 1]}
          </div>
        </div>
      </div>
      <table className={styles.calendar}>
        <thead className={styles.tableHead}>
          <tr className={styles.headerRow}>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
