import React from "react";

import { useState } from "react";
import dayjs from "dayjs";
import styles from "../styles/calendar.module.css";
export default function calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chosenDate, setChosenDate] = useState(new Date());
  const today = new Date();
  const currDate = {
    day: dayjs(today).format("DD"),
    month: dayjs(today).format("MMMM"),
    year: dayjs(today).format("YYYY"),
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  const firstDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentMonth,
    1
  ).getDay();

  const renderCalendarGrid = () => {
    const calendarGrid = [];
    let dayCount = 1;

    for (let row = 0; row < 6; row++) {
      const calendarRow = [];

      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDayOfWeek) {
          calendarRow.push(
            <td
              className={styles.calendar__day}
              key={`${row}-${col}`}
              onClick={() => handleDayClick(dayCount)}
            />
          );
        } else if (dayCount > daysInMonth) {
          break;
        } else {
          calendarRow.push(
            <td
              className={styles.calendar__day}
              key={`${row}-${col}`}
              onClick={() => handleDayClick(dayCount)}
            >
              {dayCount}
            </td>
          );
          dayCount++;
        }
      }

      calendarGrid.push(
        <tr className={styles.calendar__row} key={row}>
          {calendarRow}
        </tr>
      );
    }

    return calendarGrid;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.headers}>
        <h2 className={styles.headers__text}>Select Date</h2>
        <div className={styles.headers__date}>
          <div className={styles.headers__date__day}>{currDate.day}</div>
          <div className={styles.headers__date__month}>{currDate.month}</div>
        </div>
      </div>
      <table className={styles.calendar}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody className={styles.calendar__body}>{renderCalendarGrid()}</tbody>
      </table>
    </div>
  );
}
