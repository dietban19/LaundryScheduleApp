import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import "../styles/login.css";
import styles from "../styles/welcome.module.css";
import { useRecords } from "../helpers/useRecords";

import { useLocation } from "react-router-dom";

export default function signup({
  form,
  setForm,
  handleClick,
  storedDeviceID,
  setLogIn,
  myD,
  setMyD,
  userRecord,
  setUserRecord,
}) {
  const myRecord = useRecords();
  // useEffect(() => {
  //   console.log("Updated records:", myRecord.records);
  // }, [myRecord.records]);
  // const history = useHistory();
  const location = useLocation();
  const navigate = useNavigate();
  if (form && location.pathname === "/signup") {
    console.log("THERE IS FORM");
    console.log("!@#$");
    navigate("/home");
  }
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleError = (n, message = "error", type = "add") => {
    const target = document.getElementById(`${n}`);

    // child.classList[type]("error");

    var errorElement = target.parentElement.nextElementSibling;
    errorElement.innerHTML = message;
    target.parentElement.classList[type]("error");
    target.classList[type]("shake");
    target.addEventListener("animationend", () =>
      target.classList.remove("shake")
    );
  };
  const handleCheckInput = (e) => {
    if (!e.firstName) {
      handleError("firstName", "First Name Cannot Be Empty");
    } else {
      handleError("firstName", " ", "remove");
    }

    if (!e.lastName) {
      handleError("lastName", "Last Name Cannot Be Empty");
    } else {
      handleError("lastName", " ", "remove");
    }

    if (!e.bday) {
      handleError("bday", "Birth Date Cannot Be Empty ");
    } else {
      handleError("bday", " ", "remove");
    }
    if (!e.email) {
      handleError("email", "Email Cannot Be Empty");
    } else {
      handleError("email", " ", "remove");
    }

    if (!e.password) {
      handleError("password", "Password cannot be empty");
    } else {
      handleError("password", " ", "remove");
    }

    if (myRecord.records.some((record) => record.email === e.email)) {
      handleError("email", "Email exists");
    } else {
      handleError("email", " ", "remove");
    }
  };

  async function onSubmit(e) {
    e.preventDefault();

    handleCheckInput(form);

    // console.log(records);
    let x = document.querySelectorAll('[class*="error"]');

    if (!document.querySelectorAll('[class*="error"]').length > 0) {
      console.log("THE FORM", form);
      const updatedForm = {
        ...form,
        devices: [...form.devices, { id: storedDeviceID, loggedIn: true }],
        dates: { startDay: "", endDay: "" },
      };
      console.log("IPADATE: ", updatedForm);

      setForm(updatedForm);

      const newPerson = { ...updatedForm };
      console.log("NEWPERSON", newPerson);
      console.log("THE THE THE THE THE THE NEW", newPerson);

      await myRecord.submitForm(newPerson, () => {
        myRecord.fetchRecords(); // Trigger data refresh after navigation
      });
      //   const myData = myRecord.records.find((record) =>
      //   record.devices.some(
      //     (device) => device.id === storedDeviceID && device.loggedIn === true
      //   )
      // );
      // console.log("HERE NOW", myData)
      setLogIn(true);
      await myRecord.fetchRecords();
      const myRec = myRecord;
      setUserRecord(myRec);
      handleClick();
      navigate("/home");
    }
    // myRecord.fetchRecords(); // Trigger data refresh after navigation
    // // console.log("FROM LOGIN", myRecord.records);

    // navigate("/home");

    // return handleCalculateAge(userInputs);
  }
  // When a post request is sent to the create url, we'll add a new record to the database.

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
  // This following section will display the form that takes the input from the user.
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
          <h1 className="signup">Sign Up</h1>
          <form onSubmit={onSubmit}>
            <div className="formContent">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => updateForm({ firstName: e.target.value })}
                />
              </div>
              <span className="errInfo"></span>
            </div>

            <div className="formContent">
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => updateForm({ lastName: e.target.value })}
                />
              </div>
              <span className="errInfo"></span>
            </div>

            <div className="formContent">
              <div className="form-group">
                <label htmlFor="bday">Birth Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="bday"
                  value={form.bday}
                  onChange={(e) => updateForm({ bday: e.target.value })}
                />
              </div>
              <span className="errInfo"></span>
            </div>

            <div className="formContent">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="example@example.com"
                  value={form.email.toLowerCase()}
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
                  value={form.password}
                  onChange={(e) => updateForm({ password: e.target.value })}
                />
              </div>
              <span className="errInfo"></span>
            </div>

            <div className="buttonContainer">
              <input
                type="submit"
                value="Sign Up"
                className="signupButton"
                // onClick={handleClick}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
