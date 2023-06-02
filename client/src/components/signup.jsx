import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/login.css";
import styles from "../styles/welcome.module.css";
export default function signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bday: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  const handleError = (n, message = "error", type = "add") => {
    const target = document.getElementById(`${n}`);

    // child.classList[type]("error");
    console.log(target);
    var parentEl = target.parentElement;
    console.log(parentEl.nextElementSibling);
    parentEl.nextElementSibling.innerHTML = message;
    // target.nextElementSibling.innerHTML = message;
    // target.classList[type]("error");
    // target.classList[type]("shake");
    // target.addEventListener("animationend", () =>
    //   t.parentElement.classList.remove("shake")
    // );
    // target.parentElement.classList[type]("error");
    // target.parentElement.classList[type]("shake");
    // target.parentElement.addEventListener("animationend", () =>
    //   target.parentElement.classList.remove("shake")
  };
  const handleCheckInput = (e) => {
    // console.log(e.firstName);
    if (!e.firstName || !e.lastName || !e.bday || !e.email || !e.password) {
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
        handleError("bday", "BirthDay Cannot Be Empty ", "remove");
      } else {
        handleError("birthDay", " ", "remove");
      }
      if (!e.email) {
        handleError("email", "Email Cannot Be Empty");
      } else {
        handleError("email", " ", "remove");
      }

      if (!e.password) {
        handleError("password", "Password Cannot Be Empty");
      } else {
        handleError("password", " ", "remove");
      }
    }
  };

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    handleCheckInput(form);
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    // await fetch("http://localhost:5050/customer", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newPerson),
    // }).catch((error) => {
    //   window.alert(error);
    //   return;
    // });

    setForm({ firstName: "", lastName: "", bday: "", email: "", password: "" });
    // navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className="card">
      <div className={styles.welcomeHeaderContainer}>
        <div className={styles.headerContent}>
          <button className={styles.arrow}>
            <span></span>
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
            <span className="errInfo">Test</span>
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
            <span className="errInfo">test</span>
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
            <span className="errInfo">test</span>
          </div>

          <div className="formContent">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="example@example.com"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </div>
            <span className="errInfo">test</span>
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
          </div>
          <span className="errInfo">er</span>

          <div className="buttonContainer">
            <input type="submit" value="Sign Up" className="signupButton" />
          </div>
        </form>
      </div>
    </div>
  );
}
