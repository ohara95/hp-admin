import React, { FC } from "react";
import BuysTodoItem from "./BuysTodoItem";

type Todo = {
  content: string;
  id: string;
  isDone: boolean;
};

type Props = {
  todos: Todo[];
  setTodos: (param: Todo) => void;
};

const BuysTodoList: FC<Props> = ({ todos, setTodos }) =>
  //@ts-ignore
  todos.map((todo) => {
    return (
      <>
        <ul key={todo.id}>
          <BuysTodoItem
            content={todo.content}
            id={todo.id}
            isDone={todo.isDone}
            todos={todos}
            //@ts-ignore
            setTodos={setTodos}
          />
        </ul>
      </>
    );
  });

export default BuysTodoList;
