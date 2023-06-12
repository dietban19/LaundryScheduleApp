import { useState, useEffect } from "react";

export function useRecords() {
  const [records, setRecords] = useState([]);
  // console.log("RECORDS", records);

  async function fetchRecords() {
    const url = "https://laundryapp-szsx.onrender.com/customer/";
    const fallbackUrl = "http://localhost:5050";
    try {
      const response = await fetch(url);
      // console.log("Fetching");
      if (!response.ok) {
        // throw new Error(`An error occurred: ${response.statusText}`);
      }

      const data = await response.json();
      setRecords([...data]);
    } catch (error) {
      console.error(error);
      window.alert(error.message);
      try {
        const fallbackResponse = await fetch(fallbackUrl);
        if (!fallbackResponse.ok) {
          throw new Error(`An error occurred: ${fallbackResponse.statusText}`);
        }

        const fallbackData = await fallbackResponse.json();
        setRecords([...fallbackData]);
      } catch (fallbackError) {
        console.error(fallbackError);
        window.alert(`Both URLs failed. Error: ${fallbackError.message}`);
      }
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
    console.log("e.main", e.main);
  }

  return { records, submitForm, fetchRecords, toggleLog };
}
