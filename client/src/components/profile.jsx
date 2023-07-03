import React, { useEffect } from "react";
import NavBar from "./navbar";
import styles from "../styles/main.module.css";
import pStyles from "../styles/pStyles.module.css";
import { useRecords } from "../helpers/useRecords";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
export default function profile({
  form,
  setForm,
  storedDeviceID,
  handleClick,
  setLogIn,
  logIn,
  myD,
  setMyD,
  userRecord,
  setUserRecord,
}) {
  const myRecord = useRecords();
  const navigate = useNavigate();
  const matchingRecord = myRecord.records.find(
    (record) =>
      record.devices.id === storedDeviceID && record.email === form.email
  );
  useEffect(() => {
    // console.log("AFTERAFTER");
    console.log(myRecord);
    // navigate("/main");
  }, [myRecord]);
  const reload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  function handleLogOut() {
    const matchingRecord = myRecord.records.find(
      (record) =>
        record.devices.some((device) => device.id === storedDeviceID) &&
        record.email === form.email
    );

    console.log(matchingRecord);
    var confirmLogout = window.confirm("Are you sure you want to log out?");
    const getRecords = myRecord.records;

    console.log("LOGOUT = ", confirmLogout);
    console.log("BEFORE", myRecord.records);
    if (confirmLogout && matchingRecord) {
      const updatedMatchingRecord = { ...matchingRecord }; // Create a shallow copy

      const deviceIndex = updatedMatchingRecord.devices.findIndex(
        (device) => device.id === storedDeviceID
      );
      console.log(deviceIndex);
      if (deviceIndex !== -1) {
        updatedMatchingRecord.devices[deviceIndex].loggedIn = false;
      }
      // console.log(updatedMatchingRecord);
      const inputs = {
        main: updatedMatchingRecord,
        mr: matchingRecord,
      };

      myRecord.toggleLog(inputs);
      handleClick();
      setForm({
        devices: [],
        firstName: "",
        lastName: "",
        bday: "",
        email: "",
        password: "",
      });

      setLogIn(false);

      const myData = myRecord.records.find((record) =>
        record.devices.some(
          (device) => device.id === storedDeviceID && device.loggedIn === true
        )
      );
      // console.log("AFTER", myRecord.records, myData);

      setMyD(myData);

      reload();
    }
  }

  return (
    <div className={styles.mainPage}>
      {!form.firstName ? <div className={styles.loading}></div> : null}
      <div className={pStyles.profileContent}>
        <div className={pStyles.profileContent__header}>
          <div className={pStyles.headerText}>Profile</div>
          <div className={pStyles.headerProfile}>
            <div className={pStyles.profilePic}>
              {form.firstName.charAt(0).toUpperCase()}
            </div>
            <div className={pStyles.profileName}>
              <div className={pStyles.nameText}>
                {form.firstName} {form.lastName}
              </div>
              <div className={pStyles.showProfile}>Show Profile</div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className={pStyles.profileContent__dates}>
          <div className={pStyles.navHeader}>Booked Dates</div>
          <div className={pStyles.dates__calendar}>April 19-April 21</div>
          <div className={pStyles.edit}>
            <span className={pStyles.change}>change</span>
            <span className={pStyles.delete}>delete</span>
          </div>
        </div>
        <hr></hr>
        <div className={pStyles.profileContent__settings}>
          <div className={pStyles.navHeader}>Account Settings</div>
          <nav>
            <div className={pStyles.settingsNavContainer}>
              <div className={pStyles.imageHere}>image</div>
              <div className={pStyles.settingsText}>Personal Info</div>
            </div>
            <div className={pStyles.settingsNavContainer}>
              <div className={pStyles.imageHere}>image</div>
              <div className={pStyles.settingsText}>Privacy</div>
            </div>
          </nav>
        </div>
        <button className={pStyles.button} onClick={handleLogOut}>
          Logout
        </button>
      </div>
      <NavBar />
    </div>
  );
}
