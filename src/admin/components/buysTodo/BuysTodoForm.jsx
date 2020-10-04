import React, { useEffect } from "react";
import { db } from "../../../config/firebese";
import { CustomInput } from "../../../atoms/CustomInput";

const BuysTodoForm = ({ todos, setTodos, content, setContent }) => {
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
    <div>
      <form style={{ width: "100%", display: "flex" }}>
        <CustomInput
          style={{ width: "70%" }}
          state={content}
          setter={setContent}
          type={"text"}
        />
        <div
          style={{
            width: "45%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button
            onClick={addTodo}
            class="text-teal-500 far fa-edit text-2xl"
          />
          <button
            onClick={deleteTodo}
            class="text-teal-500 far fa-trash-alt text-2xl"
          />
          <button
            onClick={allCheck}
            class="text-teal-500 far fa-check-square text-2xl"
          />
        </div>
      </form>
    </div>
  );
};

export default BuysTodoForm;
