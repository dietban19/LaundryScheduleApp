import React, { useState, useEffect } from "react";
import styles from "../styles/popupContent.module.css";
import Calendar from "react-calendar";
import "../styles/Calendar.css";
import dayjs from "dayjs";
import { useRecords } from "../helpers/useRecords";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function BookingPopup({ setClose, bookedDate, setBookedDate, form }) {
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const myRecord = useRecords();
  function handleSubmit() {
    const matchedRecord = myRecord.records.find(
      (record) => record.email === form.email
    );
    console.log("start", startDay);
    console.log("end", endDay);
    setBookedDate(startDay, endDay);
    const inputs = {
      main: {
        devices: matchedRecord.devices,
        firstName: "TESTING THIS",
        lastName: matchedRecord.lastName,
        bday: matchedRecord.bday,
        email: matchedRecord.email,
        password: matchedRecord.password,
        dates: { startDay: startDay, endDay: endDay },
      },
      mr: matchedRecord,
    };
    myRecord.addDates(inputs);
    console.log("DATA", inputs);
    setClose();
  }
  //   function check() {}
  //   function handleChange() {
  //     // console.log("DATE", e.add(1, "month").endOf("month").toDate());
  //     // setNextMonth(e.add(1, "month").endOf("month").toDate());
  //   }
  //   let selectRange1 = checkInDate !== null;
  //   let selectRange2 = checkOutDate !== null;
  //   const handleCheckInChange = (date) => {
  //     if (checkOutDate && date > checkOutDate) {
  //       setCheckOutDate(null); // Reset check-out date if new check-in date is later
  //     }
  //     // if (checkOutDate) {
  //     //   date[1] = checkOutDate;
  //     // }

  //     setCheckInDate(date);
  //   };

  //   const handleCheckOutChange = (date) => {
  //     if (checkInDate && !Array.isArray(checkInDate)) {
  //       setCheckInDate([startDay, date]);
  //     } else if (Array.isArray(date)) {
  //       setCheckInDate(null);
  //       setCheckOutDate(date);
  //     } else {
  //       setCheckOutDate(date);
  //     }
  //   };
  //   useEffect(() => {
  //     console.log("23948534");
  //     if (!Array.isArray(checkInDate)) {
  //       console.log("changing");
  //       setStartDay(checkInDate);
  //     }
  //   }, [checkInDate]);

  const [currMonth, setCurrMonth] = useState(new Date());
  //   console.log(
  //     dayjs(startDay).format("D MM YYYY") !== dayjs(endDay).format("D MM YYYY")
  //   );
  return (
    <div className={styles.bookingPopup}>
      <div className={styles.bookingPopup__container}>
        <button onClick={setClose}>CLose</button>
        <div className={styles.bookingPopup__content}>
          <div className="HERE">When:</div>
          <div className={styles.bookingCalendar}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={dayjs(startDay)}
                onChange={(newValue) => setStartDay(newValue)}
                disablePast
              />
              <DatePicker
                label="End Date"
                value={dayjs(endDay)}
                onChange={(newValue) => setEndDay(newValue)}
                disablePast
                minDate={dayjs(startDay).add(1, "day")}
              />
            </LocalizationProvider>
          </div>
          {/* <div className={styles.bookingCalendar}>
            <Calendar
              onChange={handleCheckInChange}
              value={checkInDate}
              selectRange={true}
              returnValue="start"
            />
          </div>
          <div className={styles.bookingCalendar}>
            <Calendar
              onChange={handleCheckOutChange}
              value={checkOutDate}
              selectRange={true}
              returnValue="end"
              defaultActiveStartDate={
                new Date(currMonth.getFullYear(), currMonth.getMonth() + 1, 1)
              }
              minDate={
                new Date(currMonth.getFullYear(), currMonth.getMonth() + 1, 1)
              }
            />
          </div> */}

          <button
            onClick={handleSubmit}
            disabled={
              dayjs(startDay).format("D MM YYYY") ===
              dayjs(endDay).format("D MM YYYY")
                ? true
                : false
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingPopup;
