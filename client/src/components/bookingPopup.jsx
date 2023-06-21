import React, { useState } from "react";
import styles from "../styles/popupContent.module.css";
import Calendar from "react-calendar";
import "../styles/Calendar.css";

function BookingPopup({ setClose, bookedDate, setBookedDate }) {
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());
  const [nextMonth, setNextMonth] = useState(new Date());

  const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);

  const [selectedRange2, setSelectedRange2] = useState([
    new Date(),
    new Date(),
  ]);

  const [dates, setDates] = useState({
    startDay: "",
    endDay: "",
  });

  function handleSubmit() {
    console.log("THIS", startDay, endDay);
    const [startDate, endDate] = selectedRange;
    const [startDate2, endDate2] = selectedRange2;
    console.log("SELECTEDRANGE", selectedRange2[0]);
    // setBookedDate({ startDate: startDay, endDate: endDay });
  }
  function check() {}
  function handleChange() {
    // console.log("DATE", e.add(1, "month").endOf("month").toDate());
    // setNextMonth(e.add(1, "month").endOf("month").toDate());
  }
  console.log("next", nextMonth);
  function handleFirstCalendar(e) {
    console.log("1", e[1]);
    setSelectedRange(e);
    const [startDate, endDate] = selectedRange;
  }
  function handleSecondCalendar(value) {
    if (selectedRange[0]) {
      console.log("ExiSTS");
      console.log("SELECTED", selectedRange);
      //   console.log(value);
      //   value[0] = selectedRange[0];
      //   console.log(value);
    } else {
      console.log("no");
    }

    setSelectedRange2(value);
  }
  console.log("CHANGED", selectedRange);
  return (
    <div className={styles.bookingPopup}>
      <div className={styles.bookingPopup__container}>
        <button onClick={setClose}>CLose</button>
        <div className={styles.bookingPopup__content}>
          <div className="HERE">When:</div>
          <div className={styles.bookingCalendar}>
            <Calendar
              selectRange
              onChange={handleFirstCalendar}
              value={selectedRange}
              tileClassName={({ date, view }) =>
                view === "month" && date < new Date().setHours(0, 0, 0, 0)
                  ? "past-day"
                  : ""
              }
            />
          </div>
          <div className={styles.bookingCalendar}>
            <Calendar
              selectRange
              onChange={handleSecondCalendar}
              value={selectedRange2}
            />
          </div>

          <button onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default BookingPopup;
