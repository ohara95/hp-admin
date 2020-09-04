import React, { useState } from "react";
import { db } from "../../config/firebese";

const RecruitEdit = () => {
  const [selected, setSelected] = useState("work");
  const [decision, setDecision] = useState(false);

  const [work, setWork] = useState("");
  const [wont, setWont] = useState("");
  const [conditions, setConditions] = useState("");
  const [time, setTime] = useState("");
  const [welfare, setWelfare] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const addDBRecruit = (selectItem) => {
    let key = "";
    let value = "";

    switch (selectItem) {
      case "work":
        key = "work";
        value = work;
        break;
      case "wont":
        key = "wont";
        value = wont;
      case "conditions":
        key = "conditions";
        value = conditions;
      case "time":
        key = "time";
        value = time;
      case "welfare":
        key = "welfare";
        value = welfare;
      default:
    }

    db.collection("recruit")
      .doc("eTLykSLZuPvi6iJ48vNB")
      .update({
        [key]: value,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const chooseItem = () => {
    switch (selected) {
      case "work":
        return work;
      case "wont":
        return wont;
      case "conditions":
        return conditions;
      case "time":
        return time;
      case "welfare":
        return welfare;
      default:
    }
  };

  const selectChange = (value) => {
    switch (selected) {
      case "work":
        return setWork(value);
      case "wont":
        return setWont(value);
      case "conditions":
        return setConditions(value);
      case "time":
        return setTime(value);
      case "welfare":
        return setWelfare(value);
      default:
    }
  };

  const onNoticeSubmit = (e) => {
    e.preventDefault();
    addDBRecruit(selected);
    setDecision(true);

    switch (selected) {
      case "work":
        setWork("");
        break;
      case "wont":
        setWont("");
        break;
      case "conditions":
        setConditions("");
        break;
      case "time":
        setTime("");
        break;
      case "welfare":
        setWelfare("");
        break;
      default:
    }
  };

  const changePrev = (e) => {
    e.preventDefault();
    setDecision(true);
  };

  const displayPrev = () => {
    switch (selected) {
      case "work":
        return <>{work}</>;
      case "wont":
        return <>{wont}</>;
      case "conditions":
        return <>{conditions}</>;
      case "time":
        return <>{time}</>;
      case "welfare":
        return <>{welfare}</>;
      default:
    }
  };

  return (
    <>
      <div class="w-64">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h4>求人</h4>
          <select
            onChange={handleChange}
            class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="none">選択して下さい</option>
            <option value="work">仕事内容</option>
            <option value="wont">求める人材</option>
            <option value="conditions">応募資格</option>
            <option value="time">勤務時間・休日</option>
            <option value="welfare">福利厚生</option>
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

export default RecruitEdit;
