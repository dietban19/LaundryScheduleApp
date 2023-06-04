import { useState, useEffect } from "react";

export function useRecords() {
  const [records, setRecords] = useState([]);
  console.log("RECORDS", records);
  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await fetch("http://localhost:5050/customer/");

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const data = await response.json();
        setRecords(data);
      } catch (error) {
        window.alert(error.message);
      }
    }

    fetchRecords();
  }, []);

  return records;
}
