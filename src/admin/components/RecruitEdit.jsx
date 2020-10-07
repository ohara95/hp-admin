import React, { useState } from "react";
import { db } from "../../config/firebese";
import CustomLabel from "../../atoms/CustomLabel";

const RecruitEdit = () => {
  const [selected, setSelected] = useState("work");

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
      <div id="section4" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="求人" size="xl" />
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="投稿内容" />
            </div>
            <div className="md:w-2/3 border-gray-400 border">
              <select
                name=""
                onChange={handleChange}
                className="form-select block w-full focus:bg-white rounded py-3"
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

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="入力欄" />
            </div>
            <div className="md:w-2/3">
              <textarea
                className="form-textarea block w-full focus:bg-white border rounded"
                id="my-textarea"
                value={chooseItem()}
                onChange={(e) => {
                  selectChange(e.target.value);
                }}
                rows="8"
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
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
    </>
  );
};

export default RecruitEdit;
