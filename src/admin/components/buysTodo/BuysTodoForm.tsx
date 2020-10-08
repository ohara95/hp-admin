import React, { useEffect, FC } from "react";
import { db } from "../../../config/firebese";
import CustomInput from "../../../atoms/CustomInput";

type Todo = {
  content: string;
  id: string;
  isDone: boolean;
};

type Props = {
  todos: Todo[];
  setTodos: (param: Todo[]) => void;
  content: string;
  setContent: (param: string) => void;
};

const BuysTodoForm: FC<Props> = ({ todos, setTodos, content, setContent }) => {
  const addTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
      //@ts-ignore
      setTodos(dbData);
    });
  }, []);

  const deleteTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  const allCheck = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const isDoneTrue = todos.filter((todo) => todo.isDone === true);
    const isDoneFalse = todos.filter((todo) => todo.isDone === false);
    const changeIsDone = todos.map((todo) => {
      if (isDoneTrue.length < todos.length) {
        if (!todo.isDone) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      } else if (isDoneFalse.length < todos.length) {
        if (todo.isDone) {
          return {
            ...todo,
            isDone: false,
          };
        } else {
          return todo;
        }
      } else {
        return todos.map((todo) => {
          return { ...todo, isDone: !todo.isDone };
        });
      }
    });
    //@ts-ignore
    setTodos(changeIsDone);
  };

  return (
    <div>
      <form style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "70%" }}>
          <CustomInput
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            type={"text"}
          />
        </div>
        <div
          style={{
            width: "45%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button
            onClick={addTodo}
            className="text-teal-500 far fa-edit text-2xl"
          />
          <button
            onClick={deleteTodo}
            className="text-teal-500 far fa-trash-alt text-2xl"
          />
          <button
            onClick={allCheck}
            className="text-teal-500 far fa-check-square text-2xl"
          />
        </div>
      </form>
    </div>
  );
};

export default BuysTodoForm;
