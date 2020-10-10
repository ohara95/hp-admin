import React, { useEffect, FC } from "react";
import { db } from "../../../config/firebese";
import CustomInput from "../../../atoms/CustomInput";
import { Todo } from "./type";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
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
          ...(doc.data() as Todo),
          id: doc.id,
        };
      });
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
        return { ...todo, isDone: !todo.isDone };
      }
    });
    setTodos(changeIsDone);
  };

  return (
    <div>
      <form className="w-full flex">
        <CustomInput
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          type="text"
        />
        <div className="w-1/4 flex justify-around">
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
