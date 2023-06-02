import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Main from "./components/main";
import SignUp from "./components/signup";
import Welcome from "./components/welcome";
import Login from "./components/login";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bday: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    // Retrieve the form data from local storage when the component mounts
    const storedForm = JSON.parse(localStorage.getItem("form"));
    if (storedForm) {
      setForm(storedForm);
    }
  }, []);

  useEffect(() => {
    // Save the form data to local storage whenever it changes
    localStorage.setItem("form", JSON.stringify(form));
  }, [form]);

  const navigate = useNavigate();
  function handleLogOut() {
    var confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setForm({
        firstName: "",
        lastName: "",
        bday: "",
        email: "",
        password: "",
      });
      navigate("/welcome");
    }
  }
  return (
    <main>
      <Routes>
        <Route
          path="/welcome"
          element={<Welcome form={form} setForm={setForm} />}
        />
        <Route
          path="/signup"
          element={<SignUp form={form} setForm={setForm} />}
        />
        <Route
          path="/login"
          element={<Login form={form} setForm={setForm} />}
        />
        <Route
          path="/home"
          element={
            <Main form={form} setForm={setForm} handleLogOut={handleLogOut} />
          }
        />
      </Routes>
    </main>
  );
};

export default App;
