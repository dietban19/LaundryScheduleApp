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
  const [logIn, setLogIn] = useState(true);
  const myRecord = useRecords();
  useEffect(() => {
    myRecord.fetchRecords();
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

  const [form, setForm] = useState({
    devices: { deviceID: { id: "", loggedIn: false } },
    firstName: "",
    lastName: "",
    bday: "",
    email: "",
    password: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const thisRecord = useRecords();

  const myData = myRecord.records.find(
    (record) =>
      record.devices.deviceID.id === storedDeviceID &&
      record.devices.deviceID.loggedIn === true
  );

  useEffect(() => {
    // console.log(storedDeviceID, myRecord.records);
    if (
      (!form ||
        !form.firstName ||
        !form.lastName ||
        !form.bday ||
        !form.email ||
        !form.password) &&
      myData
    ) {
      const isLoggedIn = myData.devices.deviceID.loggedIn;

      if (isLoggedIn) {
        // setLogIn(isLoggedIn);
        console.log("refreshed", isLoggedIn);
        setForm(myData);
      }
    } else {
      navigate("/");
    }
  }, [myData]);

  function handleClick() {
    // myRecord.fetchRecords();
    console.log("NEW RECORD IS ", myRecord.records);
  }
  function handleTest() {
    console.log("after", myRecord.records);
  }

  function ttest() {
    console.log("");
  }

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
            <Navigate
              to={logIn && myRecord.records.length > 0 ? "/home" : "/welcome"}
            />
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
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
