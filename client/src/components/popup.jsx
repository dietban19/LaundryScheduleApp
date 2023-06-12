import React from "react";
import styles from "../styles/popupContent.module.css";

const Popup = ({ selectedDate, onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h3>Selected Date: {selectedDate.toDateString()}</h3>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
