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
      <div id="section4" class="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div class="md:flex mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                for="my-textfield"
              >
                求人
              </label>
            </div>
          </div>

          <div class="md:flex mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                for="my-select"
              >
                投稿内容
              </label>
            </div>
            <div class="md:w-2/3 border-gray-400 border">
              <select
                name=""
                onChange={handleChange}
                class="form-select block w-full focus:bg-white rounded"
                id="my-select"
              >
                <option value="none">選択して下さい</option>
                <option value="work">仕事内容</option>
                <option value="wont">求める人材</option>
                <option value="conditions">応募資格</option>
                <option value="time">勤務時間・休日</option>
                <option value="welfare">福利厚生</option>
              </select>
            </div>
          </div>

          <div class="md:flex mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                for="my-textarea"
                value={chooseItem()}
                onChange={(e) => {
                  selectChange(e.target.value);
                }}
              >
                入力欄
              </label>
            </div>
            <div class="md:w-2/3">
              <textarea
                class="form-textarea block w-full focus:bg-white border rounded"
                id="my-textarea"
                value={chooseItem()}
                rows="8"
              ></textarea>
            </div>
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                onClick={onNoticeSubmit}
                class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                送信
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RecruitEdit;
