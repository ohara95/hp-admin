import React from "react";
import { db } from "../../../config/firebese";

const BuysTodoItem = ({ item, id, isDone }) => {
  const checkedItem = (itemId) => {
    if (itemId === id) {
      db.collection("todos").doc(id).update({
        isDone: !isDone,
      });
    }
  };
  return (
    <>
      <li>
        <input
          value={id}
          type="checkbox"
          checked={isDone}
          onClick={(e) => checkedItem(e.target.value)}
        />
        {item}
      </li>
    </>
  );
};

export default BuysTodoItem;
