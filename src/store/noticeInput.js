import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holiday: "",
  editHoliday: "",
  other: "",
  editOther: "",
};

const slice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setHoliday: (state, action) => {
      return { ...state, holiday: action.payload };
    },
    addHoliday: (state, action) => {
      return { ...state, editHoliday: action.payload };
    },
    setOther: (state, action) => {
      return { ...state, other: action.payload };
    },
    addOther: (state, action) => {
      return { ...state, editOther: action.payload };
    },
  },
});

export default slice.reducer;
export const { setHoliday, addHoliday, setOther, addOther } = slice.actions;
