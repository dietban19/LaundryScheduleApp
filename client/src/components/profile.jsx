import React from "react";
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
}) {
  const myRecord = useRecords();
  const navigate = useNavigate();
  const matchingRecord = myRecord.records.find(
    (record) =>
      record.devices.deviceID.id === storedDeviceID &&
      record.email === form.email
  );

  async function toggleLog(e) {
    // setNewStuff(e);
    // console.log("NEW STUFF", newstuff);

    await fetch(`http://localhost:5050/customer/${matchingRecord._id}`, {
      method: "PATCH",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // console.log("before", myRecord.records);
  function handleLogOut() {
    const matchingRecord = myRecord.records.find(
      (record) =>
        record.devices.deviceID.id === storedDeviceID &&
        record.email === form.email
    );
    var confirmLogout = window.confirm("Are you sure you want to log out?");
    const getRecords = myRecord.records;
    // console.log(getRecords);
    // Find the record that matches the storedDeviceID

    if (confirmLogout && matchingRecord) {
      // Update the matching record to set loggedIn to false

      matchingRecord.devices.deviceID.loggedIn = false;
      // console.log("AFTER", matchingRecord);
      toggleLog(matchingRecord);
      handleClick();
      // console.log("after", myRecord.records);
    }
    console.log("CLEARING");
    setForm({
      devices: { deviceID: { id: "" || uuidv4(), loggedIn: true } },
      firstName: "",
      lastName: "",
      bday: "",
      email: "",
      password: "",
    });

    navigate("/");
  }

  return (
    <div className={styles.mainPage}>
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
              <div className={pStyles.settingsText}>
                Personal Info{form.email}
              </div>
            </div>
            <div className={pStyles.settingsNavContainer}>
              <div className={pStyles.imageHere}>image</div>
              <div className={pStyles.settingsText}>Privacy</div>
            </div>
          </nav>
        </div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
      <NavBar />
    </div>
  );
}
