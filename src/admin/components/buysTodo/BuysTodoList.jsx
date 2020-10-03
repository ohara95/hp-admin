import React from "react";
import BuysTodoItem from "./BuysTodoItem";

const BuysTodoList = ({ todos, setTodos }) =>
  todos.map((todo) => {
    return (
      <>
        <ul key={todo.id}>
          <BuysTodoItem
            item={todo.content}
            id={todo.id}
            isDone={todo.isDone}
            todos={todos}
            setTodos={setTodos}
          />
        </ul>
      </>
    );
  });

export default BuysTodoList;
