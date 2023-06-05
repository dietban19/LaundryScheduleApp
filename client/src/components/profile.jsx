import React from "react";
import NavBar from "./navbar";
import styles from "../styles/main.module.css";
import pStyles from "../styles/pStyles.module.css";
export default function profile({ form, setForm, handleLogOut }) {
  return (
    <div className={styles.mainPage}>
      <div className={pStyles.profileContent}>
        <div className={pStyles.profileContent__header}>
          <div className={pStyles.headerText}>Profile</div>
          <div className={pStyles.headerProfile}>
            <div className={pStyles.profilePic}>D</div>
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
        <button onClick={handleLogOut}>Logout</button>
      </div>
      <NavBar />
    </div>
  );
}
