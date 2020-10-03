import React, { useState } from "react";
import BuysTodoForm from "./BuysTodoForm";
import BuysTodoList from "./BuysTodoList";

const BuysTodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  return (
    <>
      <BuysTodoForm
        todos={todos}
        setTodos={setTodos}
        content={content}
        setContent={setContent}
      />
      <BuysTodoList todos={todos} />
    </>
  );
};

export default BuysTodoApp;
