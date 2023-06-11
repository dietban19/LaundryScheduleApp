import { useState, useEffect } from "react";

export function useRecords() {
  const [records, setRecords] = useState([]);
  // console.log("RECORDS", records);

  async function fetchRecords() {
    try {
      const response = await fetch(
        "https://laundryapp-szsx.onrender.com/customer/"
      );
      console.log("Fetching");
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setRecords([...data]);
    } catch (error) {
      window.alert(error.message);
    }
  }
  useEffect(() => {
    // console.log("FETCHING STUFF");
    fetchRecords();
  }, []);

  async function submitForm(newPerson, callback) {
    try {
      const response = await fetch(
        "https://laundryapp-szsx.onrender.com/customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        }
      );

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
    } catch (error) {
      window.alert(error);
      return;
    }
  }
  async function toggleLog(e) {
    console.log(e);
    await fetch(`https://laundryapp-szsx.onrender.com/customer/${e.mr._id}`, {
      method: "PATCH",
      body: JSON.stringify(e.main),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(e.main);
  }

  return { records, submitForm, fetchRecords, toggleLog };
}
