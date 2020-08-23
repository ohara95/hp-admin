import React, { useState } from "react";

const Management = () => {
  const [data, setData] = useState("");

  const onFormSubmit = () => {
    console.log(data);
  };

  return (
    <>
      <h1>管理画面</h1>
      <form
        onSubmit={onFormSubmit}
        onChange={(e) => {
          setData(e.target.value);
        }}
      >
        <label>日付</label>
        <input type="date" />
        <label>売上</label>
        <input type="number" />
        <button type="submit">計上</button>
      </form>
    </>
  );
};

export default Management;
