import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

import styles from "../styles/calendar.module.css";
export default function calendar() {
  const [date, setDate] = useState(new Date());

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

  const today = dayjs();
  const renderCalendarGrid = () => {
    const calendarGrid = [];
    let dayCount = 1;

    for (let row = 0; row < 6; row++) {
      const calendarRow = [];

      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDayOfWeek) {
          calendarRow.push(
            <td className={styles.calenda__day} key={`${row}-${col}`} />
          );
        } else if (dayCount > daysInMonth) {
          break;
        } else {
          calendarRow.push(
            <td className={styles.calendar__day} key={`${row}-${col}`}>
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
        <h1 className={styles.headers__text}>Today Is</h1>
        <div className={styles.headers__date}></div>
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
