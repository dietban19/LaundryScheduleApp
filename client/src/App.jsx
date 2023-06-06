import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";

// We import all the components we need in our app
import Main from "./components/main";
import Profile from "./components/profile";
import SignUp from "./components/signup";
import Welcome from "./components/welcome";
import Login from "./components/login";
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
  const storedDeviceID = localStorage.getItem("deviceID");
  const myRecord = useRecords();
  const [form, setForm] = useState({
    devices: { deviceID: { id: storedDeviceID || uuidv4(), loggedIn: false } },
    firstName: "",
    lastName: "",
    bday: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    localStorage.setItem("deviceID", form.devices.deviceID.id);
  }, [form.devices.deviceID.id]);
  const params = useParams();
  const navigate = useNavigate();
  const thisRecord = useRecords();
  const matchingRecord = myRecord.records.find(
    (record) =>
      record.devices.deviceID.id === storedDeviceID &&
      record.email === form.email
  );
  const [newstuff, setNewStuff] = useState({
    devices: { deviceID: { id: storedDeviceID || uuidv4(), loggedIn: true } },
    firstName: "",
    lastName: "",
    bday: "",
    email: "",
    password: "",
  });
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
  console.log("before", myRecord.records);
  function handleLogOut() {
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
      console.log("after", myRecord.records);
    }
  }

  function handleClick() {
    console.log("called CLICK");
    myRecord.fetchRecords();
  }
  function handleTest() {
    console.log("after", myRecord.records);
  }
  return (
    <>
      <Routes>
        <Route
          path="/welcome"
          element={<Welcome form={form} setForm={setForm} />}
        />
        <Route
          path="/signup"
          element={
            <SignUp form={form} setForm={setForm} handleClick={handleClick} />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              form={form}
              setForm={setForm}
              storedDeviceID={storedDeviceID}
              // setStoredDeviceID={setStoredDeviceID}
            />
          }
        />
        <Route path="*" element={<Navigate to="/welcome" />} />

        {/* <Route path="/main" element={<MainLayout />} /> */}

        {/* <Route
          path="/home"
          element={
            <MainLayout
              form={form}
              setForm={setForm}
              handleLogOut={handleLogOut}
            />
          }
        /> */}
        <Route path="/home" element={<Main form={form} setForm={setForm} />} />
        <Route
          path="/profile"
          element={
            <Profile
              form={form}
              setForm={setForm}
              handleLogOut={handleLogOut}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
