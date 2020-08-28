import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  work: "",
  editWork: "",
  wont: "",
  editWont: "",
  conditions: "",
  editConditions: "",
  time: "",
  editTime: "",
  welfare: "",
  editWelfare: "",
};

const slice = createSlice({
  name: "recruit",
  initialState,
  reducers: {
    setWork: (state, action) => {
      return { ...state, work: action.payload };
    },
    addWork: (state, action) => {
      return { ...state, editWork: action.payload };
    },
    setWont: (state, action) => {
      return { ...state, wont: action.payload };
    },
    addWont: (state, action) => {
      return { ...state, editWont: action.payload };
    },
    setConditions: (state, action) => {
      return { ...state, conditions: action.payload };
    },
    addConditions: (state, action) => {
      return { ...state, editConditions: action.payload };
    },
    setTime: (state, action) => {
      return { ...state, time: action.payload };
    },
    addTime: (state, action) => {
      return { ...state, editTime: action.payload };
    },
    setWelfare: (state, action) => {
      return { ...state, welfare: action.payload };
    },
    addWelfare: (state, action) => {
      return { ...state, editWelfare: action.payload };
    },
  },
});

export default slice.reducer;
export const {
  setWork,
  addWork,
  setWont,
  addWont,
  setConditions,
  addConditions,
  setTime,
  addTime,
  setWelfare,
  addWelfare,
} = slice.actions;
