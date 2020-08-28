import React from "react";
import { useSelector } from "react-redux";

const Notice = () => {
  const editWork = useSelector((state) => state.recruit.editWork);
  return (
    <>
      <button
        onClick={() => {
          console.log(editWork);
        }}
      >
        push
      </button>
      <h1>お知らせ</h1>
      <div>
        <h2>今月のお休み</h2>
        <p>火曜日</p>
      </div>
      <div>
        <h2>採用情報</h2>
        <p>仕事内容</p>
        <p>求める人材</p>
        <p>応募資格</p>
        <p>勤務時間・休日</p>
        <p>福利厚生</p>
        <h1>{editWork}</h1>
      </div>
    </>
  );
};

export default Notice;
