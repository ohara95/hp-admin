import React, { useState } from "react";
import { db } from "../../config/firebese";

const NoticeEdit = () => {
  const [holiday, setHoliday] = useState("");
  const [other, setOther] = useState("");
  const [selected, setSelected] = useState("holiday");
  const [decision, setDecision] = useState(false);

  const addDBNotice = (selectItem) => {
    let key = "";
    let value = "";

    switch (selectItem) {
      case "holiday":
        key = "holiday";
        value = holiday;
        break;
      case "other":
        key = "other";
        value = other;
      default:
    }

    db.collection("notice")
      .doc("f3068OjZY4BqCj3QiLjO")
      .update({
        [key]: value,
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
    }
  };

  const selectChange = (value) => {
    switch (selected) {
      case "holiday":
        return setHoliday(value);
      case "other":
        return setOther(value);
      default:
    }
  };

  const onNoticeSubmit = (e) => {
    e.preventDefault();
    switch (selected) {
      case "holiday":
        setHoliday("");
        break;
      case "other":
        setOther("");
        break;
      default:
        alert("選択して下さい");
    }
    addDBNotice(selected);
    setDecision(false);
  };

  const changePrev = (e) => {
    e.preventDefault();
    setDecision(true);
  };

  const displayPrev = () => {
    switch (selected) {
      case "holiday":
        return <>{holiday}</>;
      case "other":
        return <>{other}</>;
      default:
        return null;
    }
  };

  return (
    <>
      <div class="inline-block relative w-64">
        <form>
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
          <button
            onClick={onNoticeSubmit}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            送信
          </button>
          <button
            onClick={changePrev}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            プレビュー
          </button>
        </form>
      </div>
      <div>{decision && displayPrev()}</div>
    </>
  );
};

export default NoticeEdit;
