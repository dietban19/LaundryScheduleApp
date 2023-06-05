import React from "react";
import Login from "./login";
import Welcome from "./Welcome";
import Signup from "./signup";
function welcomeLayout({ form, setForm }) {
  return (
    <div>
      <Welcome form={form} setForm={setForm} />
      <Login form={form} setForm={setForm} />
      <Signup f />
    </div>
  );
}

export default welcomeLayout;
