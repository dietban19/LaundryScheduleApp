import { useState, useEffect } from "react";

export function useRecords() {
  const [records, setRecords] = useState([]);
  // console.log("RECORDS", records);

  async function fetchRecords() {
    // console.log("FETCHING");
    try {
      const response = await fetch("http://localhost:5050/customer/");

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("DATA!", [...data]);
      setRecords([...data]);
    } catch (error) {
      window.alert(error.message);
    }
  }
  // console.log("RECORDS", records);
  useEffect(() => {
    // console.log("FETCHING STUFF");
    fetchRecords();
  }, []);

  async function submitForm(newPerson, callback) {
    try {
      const response = await fetch("http://localhost:5050/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
    } catch (error) {
      window.alert(error);
      return;
    }
  }

  return { records, submitForm, fetchRecords };
}
