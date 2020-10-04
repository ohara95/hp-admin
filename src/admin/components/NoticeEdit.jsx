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
      <div id="section4" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                for="my-textfield"
              >
                休日・その他
              </label>
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                for="my-select"
              >
                投稿内容
              </label>
            </div>
            <div className="md:w-2/3 border-gray-400 border">
              <select
                name=""
                onChange={handleChange}
                className="form-select block w-full focus:bg-white rounded"
                id="my-select"
              >
                <option value="none">選択して下さい</option>
                <option value="holiday">休日</option>
                <option value="other">その他</option>
              </select>
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                for="my-textarea"
                value={chooseItem()}
                onChange={(e) => {
                  selectChange(e.target.value);
                }}
              >
                入力欄
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="form-textarea block w-full focus:bg-white border rounded"
                id="my-textarea"
                value=""
                rows="8"
              ></textarea>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                onClick={onNoticeSubmit}
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                送信
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <button
            onClick={changePrev}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            プレビュー
          </button>
      </div>
      <div>{decision && displayPrev()}</div> */}
    </>
  );
};

export default NoticeEdit;
