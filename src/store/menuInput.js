import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cuisine: "",
  editCuisine: "",
  drink: "",
  editDrink: "",
  recommend: "",
  editRecommend: "",
  amount: "",
  editAmount: "",
};

const slice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setCuisine: (state, action) => {
      return { ...state, cuisine: action.payload };
    },
    addCuisine: (state, action) => {
      return { ...state, editCuisine: action.payload };
    },
    setAmount: (state, action) => {
      return { ...state, amount: action.payload };
    },
    addAmount: (state, action) => {
      return { ...state, editAmount: action.payload };
    },
    setDrink: (state, action) => {
      return { ...state, drink: action.payload };
    },
    addDrink: (state, action) => {
      return { ...state, editDrink: action.payload };
    },
    setRecommend: (state, action) => {
      return { ...state, recommend: action.payload };
    },
    addRecommend: (state, action) => {
      return { ...state, editRecommend: action.payload };
    },
  },
});

export default slice.reducer;
export const {
  setCuisine,
  addCuisine,
  setDrink,
  addDrink,
  setRecommend,
  addRecommend,
  setAmount,
  addAmount,
} = slice.actions;
