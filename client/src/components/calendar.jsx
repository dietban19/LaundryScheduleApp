import React, { useState, useEffect } from "react";
import styles from "../styles/calendar.module.css";
import dayjs from "dayjs";
import Popup from "./popup";
const Calendar = ({
  bookedDate,
  setBookedDate,
  showBookPopup,
  setShowBookPopup,
  handleBook,
  filteredArray,
  bookedUsers,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [dayFirst, setDayFirst] = useState(0);
  const [dayLast, setDayLast] = useState(0);
  const [dayRange, setDayRange] = useState({
    colIndex: 0,
    rowIndex: 0,
    lastDay: 0,
    dates: { dayOne: 0, dayLast: 0 },
  });
  const handleDateClick = (date, isIncluded, userDatas) => {
    const isSelecteds =
      date.toDateString() === (selectedDate && selectedDate.toDateString());
    console.log(isSelecteds);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today || isIncluded || userDatas) {
      return;
    }
    setSelectedDate(date);
    setShowPopup(true);
  };
  const handlePopupClose = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    if (selectedDate) {
      const currentDate = selectedDate ? selectedDate : new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);

      const startingDay = firstDay.getDay();

      const rowIndex = Math.floor(
        (startingDay + selectedDate.getDate() - 1) / 7
      );
      const colIndex = (startingDay + selectedDate.getDate() - 1) % 7;
      const lday = parseInt(dayjs(lastDay).format("DD"), 10);
      setDayFirst(parseInt(dayjs(selectedDate).format("DD"), 10) - colIndex);
      const endDay =
        parseInt(dayjs(selectedDate).format("DD"), 10) + 6 - colIndex;
      setDayRange({
        colIndex: colIndex,
        rowIndex: rowIndex,
        lastDay: lday,
        dates: {
          dayOne: parseInt(dayjs(selectedDate).format("DD"), 10) - colIndex,
          dayLast: endDay > lday ? lday : endDay,
        },
      });
    }
  }, [selectedDate]);

  const renderCalendar = () => {
    const currentDate = selectedDate ? selectedDate : new Date();

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendarDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(currentYear, currentMonth, i);

      const isSelected =
        day.toDateString() === (selectedDate && selectedDate.toDateString());
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // const dayss = new Date();
      const isPastDay = day < today;
      // const thisday = today.getTime() === dayss.getTime();
      const isTodays = day.getTime() === today.getTime();
      const isIncluded = bookedUsers.some((customer) => {
        const startDay = new Date(customer.dates.startDay);
        const endDay = new Date(customer.dates.endDay);
        return day >= startDay && day <= endDay;
      });
      const userDatas =
        day >= new Date(bookedDate.startDate) &&
        day <= new Date(bookedDate.endDate);
      // day.toString() === bookedDate.endDate.toString();

      calendarDays.push(
        <div
          key={i}
          className={styles.calendar__day}
          onClick={() => handleDateClick(day, isIncluded, userDatas)}
        >
          <div
            className={`${styles.myDay} 
             ${isSelected ? styles.selected : ""} 
             ${isPastDay ? `${styles.pastDay}` : ""}
             ${isIncluded ? styles.booked : ""}
             ${userDatas ? styles.booked : ""}
             

             `}
          >
            {i}
          </div>
        </div>
      );
    }

    const blanks = [];
    for (let i = 0; i < startingDay; i++) {
      blanks.push(
        <div key={`blank_${i}`} className="calendar-day empty"></div>
      );
    }

    const totalSlots = [...blanks, ...calendarDays];
    const rows = [];
    let cells = [];

    totalSlots.forEach((slot, index) => {
      if (index % 7 !== 0) {
        cells.push(slot);
      } else {
        if (cells.length > 0) {
          rows.push(cells);
        }
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
  const handlePreviousMonth = () => {
    setSelectedDate((prevDate) => {
      const previousMonth = prevDate
        ? dayjs(prevDate).subtract(1, "month")
        : dayjs().subtract(1, "month");
      const firstDayOfMonth = previousMonth.startOf("month");
      return firstDayOfMonth.toDate();
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      const nextMonth = prevDate
        ? dayjs(prevDate).add(1, "month")
        : dayjs().add(1, "month");
      const firstDayOfMonth = nextMonth.startOf("month");
      return firstDayOfMonth.toDate();
    });
  };
  function check() {
    const currentDate = selectedDate ? selectedDate : new Date();

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const day = new Date(currentYear, currentMonth, 7);
    const userDatas =
      day.toString() >= bookedDate.startDate.toString() &&
      day <= bookedDate.endDate.toString();
    // console.log(day, bookedDate.startDate, bookedDate.endDate);
    console.log(
      day >= new Date(bookedDate.startDate)
      //
      // bookedDate.startDate.toLocaleDateString()
    );
    console.log(bookedUsers);
  }

  return (
    <div className={styles.calendarContainer}>
      {showPopup && (
        <div className={styles.popup}>
          <Popup
            selectedDate={selectedDate}
            onClose={handlePopupClose}
            dayRange={dayRange}
            month={months[dayjs(selectedDate).format("M") - 1]}
            bookedDate={bookedDate}
            setBookedDate={setBookedDate}
            showBookPopup={showBookPopup}
            setShowBookPopup={setShowBookPopup}
            handleBook={handleBook}
          />
        </div>
      )}
      <button onClick={check}>Check FIrst</button>
      <div className={styles.headers}>
        <h2 className={styles.headers__text}>
          {selectedDate ? "Selected Date" : "Today's Date"}
        </h2>
        <div className={styles.headers__dates}>
          <button onClick={handlePreviousMonth}>
            <span>{"<"}</span>
          </button>
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
          <button onClick={handleNextMonth}>
            <span>{">"}</span>
          </button>
        </div>
      </div>
      <table className={styles.calendar}>
        <thead className={styles.tableHead}>
          <tr className={styles.headerRow}>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>Th</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
