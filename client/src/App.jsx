import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";
import styles from "./styles/main.module.css";
// We import all the components we need in our app
import Main from "./components/main";
import Profile from "./components/profile";
import SignUp from "./components/signup";
import Welcome from "./components/welcome";
import Login from "./components/login";
import Loading from "./components/loading";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "./components/mainlayout.jsx";
import { v4 as uuidv4 } from "uuid";
import { useRecords } from "./helpers/useRecords";
/* add unique id for each device
when user logsin, the uniqueID will be set to the profile. 
THere can be multiple devices logged in to profile. 
once the app is refreshed, the app will take the id of the device
see if logged in = true. if true, the app will take the profile details
devices:{deviceID:{id:123, loggedIn:true},{id:432, loggedIn:false} }
*/

const App = () => {
  const [logIn, setLogIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const myRecord = useRecords();
  // useEffect(() => {
  //   myRecord.fetchRecords();
  // }, []);

  useEffect(() => {
    setIsLoading(true);

    myRecord.fetchRecords().then(() => {
      setIsLoading(false);
    });
  }, []);

  const getDeviceId = () => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  };
  const storedDeviceID = getDeviceId();
  const [myD, setMyD] = useState("");
  const [form, setForm] = useState({
    devices: [],
    firstName: "",
    lastName: "",
    bday: "",
    email: "",
    password: "",
    dates: "",
  });

  const navigate = useNavigate();
  const myData = myRecord.records.find((record) =>
    record.devices.some(
      (device) => device.id === storedDeviceID && device.loggedIn === true
    )
  );
  // console.log(myData);
  useEffect(() => {
    const delay = 1000; // Adjust the delay time as needed
    setIsLoading(true);
    setTimeout(() => {
      myRecord.fetchRecords();
      setIsLoading(false);

      if (myD) {
        if (!logIn) {
          console.log("");
          // setLogIn(true);
        }
      }
    }, delay);
  }, [logIn]);

  useEffect(() => {
    if (
      !form ||
      !form.firstName ||
      !form.lastName ||
      !form.bday ||
      !form.email ||
      !form.password
    ) {
      if (myData) {
        console.log("hello");
        setForm(myData);
      } else {
        navigate("/");
      }
    }
  }, [myRecord.records, logIn]);

  function handleClick() {
    // myRecord.fetchRecords();
    console.log("NEW RECORD IS ", myRecord.records);
  }
  console.log(
    isLoading
      ? "Loading"
      : logIn && myRecord.records.length > 0
      ? "home"
      : "welcome"
  );
  return (
    <>
      {/* <div>
        {!form.firstName ? <div className={styles.loading}></div> : null}
      </div> */}
      <Routes>
        <Route
          path="/welcome"
          element={<Welcome form={form} setForm={setForm} />}
        />
        <Route
          path="/*"
          element={
            isLoading ? (
              <Loading /> // Replace 'Loading' with the actual loading component
            ) : (
              <Navigate
                to={logIn && myRecord.records.length > 0 ? "/home" : "/welcome"}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            <SignUp
              form={form}
              setForm={setForm}
              handleClick={handleClick}
              storedDeviceID={storedDeviceID}
              setLogIn={setLogIn}
              myD={myD}
              setMyD={setMyD}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              form={form}
              setForm={setForm}
              storedDeviceID={storedDeviceID}
              setLogIn={setLogIn}
              logIn={logIn}
              myD={myD}
              setMyD={setMyD}
            />
          }
        />

        <Route path="/home" element={<Main form={form} setForm={setForm} />} />
        <Route
          path="/profile"
          element={
            <Profile
              form={form}
              setForm={setForm}
              storedDeviceID={storedDeviceID}
              handleClick={handleClick}
              setLogIn={setLogIn}
              myD={myD}
              setMyD={setMyD}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
