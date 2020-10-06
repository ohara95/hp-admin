import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: "",
  id: "",
  isDone: false,
};

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todos: (state, action) => {
      return { ...state, content: action.payload };
    },
  },
});

export default slice.reducer;
// action
export const { todos } = slice.actions;

// state.combineReducersに入ってる名前.initialstate
// const todos2 = useSelector((state) => state.todo);
