import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";
import { CustomInput } from "../../atoms/CustomInput";
import { set } from "date-fns";

const BuysTodo = () => {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  return (
    <>
      <BuysListForm
        todos={todos}
        setTodos={setTodos}
        content={content}
        setContent={setContent}
      />
      <BuysTodoList todos={todos} />
    </>
  );
};

const BuysTodoList = ({ todos, setTodos }) => {
  return todos.map((todo) => {
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
};

const BuysTodoItem = ({ item, id, isDone, setTodos, todos }) => {
  const checkedItem = (itemId) => {
    if (itemId === id) {
      // const changeIsDone = todos.map((todo) => {
      //   return { ...todo, isDone: !todo.isDone };
      // });
      // setTodos(changeIsDone);
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

const BuysListForm = ({ todos, setTodos, content, setContent }) => {
  const addTodo = (e) => {
    e.preventDefault();
    if (content === "") {
      return;
    } else {
      setContent("");
      db.collection("todos").add({
        content,
        isDone: false,
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

  const deleteTodo = (e) => {
    e.preventDefault();
    const deleteItem = todos.filter((todo) => todo.isDone);
    for (const key of deleteItem) {
      db.collection("todos")
        .doc(key.id)
        .onSnapshot((snap) => {
          snap.ref.delete();
        });
    }
  };

  const allCheck = (e) => {
    e.preventDefault();
    const changeIsDone = todos.map((todo) => {
      return { ...todo, isDone: !todo.isDone };
    });
    setTodos(changeIsDone);
  };
  return (
    <>
      <form>
        <CustomInput state={content} setter={setContent} type={"text"} />
        <button onClick={addTodo}>追加</button>
        <button onClick={deleteTodo}>削除</button>
        <button onClick={allCheck}>一括チェック</button>
      </form>
    </>
  );
};

export default BuysTodo;
