import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/login.css";
import styles from "../styles/welcome.module.css";
import { useRecords } from "../helpers/useRecords";

export default function login({
  form,
  setForm,
  storedDeviceID,
  setStoredDeviceId,
  setLogIn,
  myD,
  setMyD,
  userRecord,
  setUserRecord,
}) {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const records = useRecords();

  const navigate = useNavigate();

  function updateForm(value) {
    return setInfo((prev) => {
      return { ...prev, ...value };
    });
  }
  //   function updateForm(value) {
  //     return setForm((prev) => {
  //       return { ...prev, ...value };
  //     });
  //   }
  const handleError = (n, message = "error", type = "add") => {
    const target = document.getElementById(`${n}`);
    // console.log(target.parentElement.nextElementSibling);
    var errorElement = target.parentElement.nextElementSibling;
    errorElement.innerHTML = message;
    target.parentElement.classList[type]("error");
    // target.previousElementSibling;
    target.classList[type]("shake");
    target.addEventListener("animationend", () =>
      target.classList.remove("shake")
    );
  };
  const handleCheckInput = (e) => {
    if (!e.email) {
      console.log("no");
      handleError("email", "Email Cannot Be Empty");
    } else {
      handleError("email", " ", "remove");
    }

    if (!e.password) {
      handleError("password", "Password Cannot Be Empty");
    } else {
      handleError("password", " ", "remove");
    }
    if (records.records.some((record) => record.email === e.email)) {
      const matchedRecord = records.records.find(
        (record) => record.email === e.email
      );
      const matchedPassword = matchedRecord.password;
      console.log(matchedPassword);
      if (matchedPassword !== e.password) {
        handleError("password", "Incorrect Password");
      }
    } else {
      handleError("email", "Email Does Not exist");
    }
  };

  async function onSubmit(e) {
    e.preventDefault();

    handleCheckInput(info);
    let x = document.querySelectorAll('[class*="error"]');

    if (!document.querySelectorAll('[class*="error"]').length > 0) {
      const matchedRecord = records.records.find(
        (record) => record.email === info.email
      );
      setForm({
        devices: [],
        firstName: "",
        lastName: "",
        bday: "",
        email: "",
        password: "",
      });
      if (matchedRecord) {
        const mDevices = matchedRecord.devices;
        const matchedDevice = matchedRecord.devices.find(
          (device) => device.id === storedDeviceID
        );
        if (matchedDevice) {
          matchedDevice.loggedIn = true;
        } else {
          matchedRecord.devices.push({ id: storedDeviceID, loggedIn: true });
        }

        // if (
        //   !matchedRecord.devices.some((device) => device.id === storedDeviceID)
        // ) {
        //   console.log("3");
        //   console.log(updatedDevices);
        //   updatedDevices.push({ id: storedDeviceID, loggedIn: true });
        // }

        const inputs = {
          main: {
            devices: matchedRecord.devices,
            firstName: matchedRecord.firstName,
            lastName: matchedRecord.lastName,
            bday: matchedRecord.bday,
            email: matchedRecord.email,
            password: matchedRecord.password,
          },
          mr: matchedRecord,
        };
        records.toggleLogIn(inputs);
        const myData = records.records.find((record) =>
          record.devices.some(
            (device) => device.id === storedDeviceID && device.loggedIn === true
          )
        );
        console.log("HERE NOW", inputs);
        setMyD(myData);
        setLogIn(true);
        setForm(inputs.main);
        console.log("about to fetch");

        await records.fetchRecords();
        const myRec = records;
        setUserRecord(myRec);
        console.log(userRecord);
        navigate("/home");
      }
    }

    // const updatedDevices = {
    //   ...matchedRecord,
    //   devices:[
    //     ...matchedRecord.devices,
    //     id:
    //       matchedRecord.devices.deviceID.id === storedDeviceID
    //         ? matchedRecord.devices.deviceID.id
    //         : storedDeviceID,
    //     loggedIn: true,
    //   ]

    // };
    // const updatedDevices = {
    //   ...matchedRecord.devices,
    //   deviceID:
    //     matchedRecord.devices.deviceID.id === storedDeviceID
    //       ? { ...matchedRecord.devices.deviceID, loggedIn: true }
    //       : { ...matchedRecord.devices, id: storedDeviceID, loggedIn: true },
    // };
    // const updatedDevices = {
    //   ...matchedRecord.devices,
    // };

    // updatedDevices.deviceID = {
    //   id: storedDeviceID,
    //   loggedIn: true,
    // };

    // setForm({ firstName: "", lastName: "", bday: "", email: "", password: "" });
    // navigate("/");
  }
  //   console.log(info);
  // This fllowing section will display the form that takes the input from the user.
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  function handleGoBack() {
    setForm({
      devices: [],
      firstName: "",
      lastName: "",
      bday: "",
      email: "",
      password: "",
    });
    console.log("going bacl");
    navigate("/welcome");
  }
  return (
    <div className="welcome-page">
      <div className="card">
        <div className={styles.welcomeHeaderContainer}>
          <div className={styles.headerContent}>
            <button className={styles.arrow} onClick={handleGoBack}>
              <span>{"<"}</span>
            </button>
            <h2 className={styles.headerTitle}> Log in or sign up</h2>
          </div>
          <span className={styles.line}></span>
        </div>

        <div className="form">
          <h1 className="signup">Log In</h1>
          <form onSubmit={onSubmit}>
            <div className="formContent">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="example@example.com"
                  // value={form.email}
                  onChange={(e) => updateForm({ email: e.target.value })}
                />
              </div>
              <span className="errInfo"></span>
            </div>

            <div className="formContent">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                  // value={form.password}
                  onChange={(e) => updateForm({ password: e.target.value })}
                />
              </div>
              <span className="errInfo"></span>
            </div>

            <div className="buttonContainer">
              <input type="submit" value="Sign Up" className="signupButton" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
