import React from "react";

const BuysTodoItem = ({ item, id, isDone, todos, setTodos }) => {
  const checkedItem = (itemId) => {
    const checkIsDone = todos.map((todo) => {
      if (itemId === todo.id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    setTodos(checkIsDone);
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
