import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../config/firebese";
import {
  setHoliday,
  addHoliday,
  setOther,
  addOther,
} from "../../store/noticeInput";

const NoticeEdit = () => {
  const dispatch = useDispatch();
  const { holiday, other, editHoliday, editOther } = useSelector(
    (state) => state.notice
  );

  const [selected, setSelected] = useState("holiday");
  const [decision, setDecision] = useState(true);

  // クリック２回押さなきゃeditHolidayに表示されない
  // 確認画面には表示される
  const addDBNotice = (selectItem) => {
    let key = "";
    let value = "";

    switch (selectItem) {
      case "holiday":
        key = "holiday";
        value = editHoliday;
        break;
      case "other":
        key = "other";
        value = editOther;
      default:
    }

    db.collection("notice")
      .doc("f3068OjZY4BqCj3QiLjO")
      .update({
        [key]: value,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const chooseItem = () => {
    switch (selected) {
      case "holiday":
        return holiday;
      case "other":
        return other;
      default:
        return null;
    }
  };

  const selectChange = (value) => {
    switch (selected) {
      case "holiday":
        return dispatch(setHoliday(value));
      case "other":
        return dispatch(setOther(value));
      default:
        return null;
    }
  };

  const onNoticeSubmit = (e) => {
    e.preventDefault();
    switch (selected) {
      case "holiday":
        dispatch(addHoliday(holiday));
        dispatch(setHoliday(""));
        break;
      case "other":
        dispatch(addOther(other));
        dispatch(setOther(""));
        break;
      default:
        alert("選択して下さい");
    }
    addDBNotice(selected);
  };

  const changePrev = () => {
    switch (selected) {
      case "holiday":
        return <>{editHoliday}</>;
      case "other":
        return <>{editOther}</>;
      default:
        return null;
    }
  };

  return (
    <>
      <div class="inline-block relative w-64">
        <form onSubmit={onNoticeSubmit}>
          <select
            onChange={handleChange}
            class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="none">選択して下さい</option>
            <option value="holiday">休日</option>
            <option value="other">その他</option>
          </select>
          <textarea
            type="text"
            class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="4"
            value={chooseItem()}
            onChange={(e) => {
              selectChange(e.target.value);
            }}
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            送信
          </button>
        </form>
      </div>
      <div>
        {decision && changePrev()}
        <button
          onClick={() => {
            setDecision(false);
          }}
        >
          確認OK
        </button>
      </div>
    </>
  );
};

export default NoticeEdit;
