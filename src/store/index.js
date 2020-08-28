import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import recruitReducer from "./recruitInput";
import noticeReducer from "./noticeInput";

// reducerの結合
const reducer = combineReducers({
  recruit: recruitReducer,
  notice: noticeReducer,
});

// 結合したreducerをstoreに渡す
const store = configureStore({ reducer });
export default store;
