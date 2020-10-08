import React, { FC } from "react";

type Todo = {
  content: string;
  id: string;
  isDone: boolean;
};

type Props = {
  content: string;
  id: string;
  isDone: boolean;
  todos: Todo[];
  setTodos: (param: Todo[]) => void;
};

const BuysTodoItem: FC<Props> = ({ content, id, isDone, todos, setTodos }) => {
  const checkedItem = (itemId: string) => {
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
          onClick={(e) => checkedItem((e.target as HTMLInputElement).value)}
        />
        {content}
      </li>
    </>
  );
};

export default BuysTodoItem;
