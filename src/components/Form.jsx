import { useState } from "react";

export default function Form({ houseid = id }) {
  const [value, setValue] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/api/meterreadings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        houseid: houseid,
        metertype: type,
        readingvalue: value,
        date: new Date().toISOString(), 
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add meter reading");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Added meter reading:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Value:
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select...</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
