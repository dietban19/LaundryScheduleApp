import React, { useState, useEffect } from "react";
import styles from "../styles/popupContent.module.css";
import Calendar from "react-calendar";
import "../styles/Calendar.css";
import dayjs from "dayjs";
import { useRecords } from "../helpers/useRecords";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function BookingPopup({
  setClose,
  bookedDate,
  setBookedDate,
  form,
  bookedUsers,
  selectedDate,
}) {
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const myRecord = useRecords();
  console.log("DATEEE", selectedDate);
  useEffect(() => {
    const formattedDisabledDates = bookedUsers.map((dateObj) => ({
      start: dayjs(dateObj.dates.startDay).toDate(),
      end: dayjs(dateObj.dates.endDay).toDate(),
    }));

    setDisabledDates(formattedDisabledDates);
  }, []);
  function handleSubmit() {
    const matchedRecord = myRecord.records.find(
      (record) => record.email === form.email
    );
    console.log("start", startDay.$d);
    console.log("end", endDay);
    setBookedDate({
      startDate: startDay.$d.toString(),
      endDate: endDay.$d.toString(),
    });
    console.log("BOOKEDDATE", bookedDate);
    const inputs = {
      main: {
        devices: matchedRecord.devices,
        firstName: matchedRecord.firstName,
        lastName: matchedRecord.lastName,
        bday: matchedRecord.bday,
        email: matchedRecord.email,
        password: matchedRecord.password,
        dates: {
          startDay: startDay.$d.toString(),
          endDay: endDay.$d.toString(),
        },
      },
      mr: matchedRecord,
    };
    myRecord.addDates(inputs);
    console.log("DATA", inputs);
    setClose();
  }

  function test() {
    console.log(selectedDate);
  }
  return (
    <div className={styles.bookingPopup}>
      <button onClick={test}>Button</button>
      <div className={styles.bookingPopup__container}>
        <button onClick={setClose}>CLose</button>
        <div className={styles.bookingPopup__content}>
          <div className="HERE">When:</div>
          <div className={styles.bookingCalendar}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDay || dayjs(selectedDate)}
                onChange={(newValue) => setStartDay(newValue)}
                disablePast
                shouldDisableDate={(date) =>
                  disabledDates.some(
                    (disabledDate) =>
                      date >= disabledDate.start && date <= disabledDate.end
                  )
                }
              />
              <DatePicker
                label="End Date"
                value={endDay}
                onChange={(newValue) => setEndDay(newValue)}
                disablePast
                minDate={dayjs(startDay).add(1, "day")}
                shouldDisableDate={(date) =>
                  disabledDates.some(
                    (disabledDate) =>
                      date >= disabledDate.start && date <= disabledDate.end
                  )
                }
              />
            </LocalizationProvider>
          </div>
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
