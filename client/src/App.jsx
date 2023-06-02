import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Main from "./components/main";
import SignUp from "./components/signup";
import Welcome from "./components/welcome";
import Login from "./components/login";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
};

export default App;
