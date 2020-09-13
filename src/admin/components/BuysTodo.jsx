import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";
import { CustomInput } from "../../atoms/CustomInput";

const BuysTodo = () => {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(false);
  return (
    <>
      <BuysListForm
        todos={todos}
        setTodos={setTodos}
        content={content}
        setContent={setContent}
        isDone={isDone}
      />
      <BuysTodoList todos={todos} isDone={isDone} setIsDone={setIsDone} />
    </>
  );
};

const BuysTodoList = ({ todos, isDone, setIsDone }) => {
  return todos.map((todo) => {
    return (
      <>
        <ul key={todo.id}>
          <BuysTodoItem
            item={todo.content}
            isDone={isDone}
            setIsDone={setIsDone}
            id={todo.id}
          />
        </ul>
      </>
    );
  });
};

const BuysTodoItem = ({ item, id, isDone, setIsDone }) => {
  const checkedItem = (itemId) => {
    setIsDone(!isDone);
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
          onClick={(e) => checkedItem(e.target.id)}
        />
        {item}
      </li>
    </>
  );
};

const BuysListForm = ({ todos, setTodos, content, setContent, isDone }) => {
  const addTodo = (e) => {
    e.preventDefault();
    if (content === "") {
      return;
    } else {
      setContent("");
      db.collection("todos").add({
        content,
        isDone,
      });
    }
  };

  useEffect(() => {
    db.collection("todos").onSnapshot((snap) => {
      const dbData = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setTodos(dbData);
    });
  }, []);

  const deleteTodo = () => {};
  return (
    <>
      <form>
        <CustomInput state={content} setter={setContent} type={"text"} />
        <button onClick={addTodo}>追加</button>
        <button onClick={deleteTodo}>削除</button>
      </form>
    </>
  );
};

export default BuysTodo;
