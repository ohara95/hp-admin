import React, { FC, useState } from "react";
import { db } from "../../config/firebese";
import { CustomLabel, CustomSelect } from "../../atoms";

type selectedProps = "holiday" | "other" | "none";

const NoticeEdit: FC = () => {
  const [holiday, setHoliday] = useState("");
  const [other, setOther] = useState("");
  const [selected, setSelected] = useState<selectedProps>("holiday");

  const addDBNotice = (selectItem: selectedProps) => {
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

  const chooseItem = () => {
    switch (selected) {
      case "holiday":
        return holiday;
      case "other":
        return other;
      default:
    }
  };

  const selectChange = (value: string) => {
    switch (selected) {
      case "holiday":
        return setHoliday(value);
      case "other":
        return setOther(value);
      default:
    }
  };

  const onNoticeSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
  };

  return (
    <>
      <div id="section4" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="休日・その他" size="xl" />
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="投稿内容" />
            </div>
            <div className="md:w-2/3 border-gray-400 border-2 rounded">
              <CustomSelect
                onChange={(e) => {
                  setSelected(e.target.value as selectedProps);
                }}
              >
                <option value="none">選択して下さい</option>
                <option value="holiday">休日</option>
                <option value="other">その他</option>
              </CustomSelect>
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="入力欄" />
            </div>
            <div className="md:w-2/3">
              <textarea
                className="block w-full border-gray-400 border-2 rounded px-3 py-3"
                rows={6}
                onChange={(e) => {
                  selectChange(e.target.value);
                }}
                value={chooseItem()}
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                onClick={onNoticeSubmit}
                type="button"
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
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

export default NoticeEdit;
