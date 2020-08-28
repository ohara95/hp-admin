import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setHoliday,
  addHoliday,
  setOther,
  addOther,
} from "../../store/noticeInput";

const NoticeEdit = () => {
  const dispatch = useDispatch();
  const holiday = useSelector((state) => state.recruit.holiday);
  const other = useSelector((state) => state.recruit.other);

  const editHoliday = useSelector((state) => state.recruit.editHoliday);
  const editOther = useSelector((state) => state.recruit.editOther);

  const [selected, setSelected] = useState("work");

  const [decision, setDecision] = useState(true);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const checkBox = () => {
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
        return null;
    }
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
            value={checkBox()}
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
