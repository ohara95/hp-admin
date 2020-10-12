import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";

const Notice = () => {
  const [notice, setNotice] = useState([]);
  const [recruit, setRecruit] = useState([]);

  useEffect(() => {
    db.collection("notice").onSnapshot((snap) => {
      const notice = snap.docs.map((doc) => doc.data());
      setNotice(notice);
    });

    db.collection("recruit").onSnapshot((snap) => {
      const recruit = snap.docs.map((doc) => doc.data());
      setRecruit(recruit);
    });
  }, []);

  // const displayItem = (item) => {
  //   if (notice) {
  //     switch (item) {
  //       case "holiday":
  //         return notice.map((el) => el.holiday);
  //       case "other":
  //         return notice.map((el) => el.other);
  //       default:
  //     }
  //   }
  //   if (recruit) {
  //     switch (item) {
  //       case "work":
  //         return recruit.map((el) => el.work);
  //       case "wont":
  //         return recruit.map((el) => el.wont);
  //       case "conditions":
  //         return recruit.map((el) => el.conditions);
  //       case "time":
  //         return recruit.map((el) => el.time);
  //       case "welfare":
  //         return recruit.map((el) => el.welfare);
  //       default:
  //     }
  //   }
  // };

  const displayItem = () => {
    return recruit.map((data) => {
      for (const key in data) {
        return (
          <>
            <p>{data[key]}</p>
          </>
        );
      }
    });
  };

  return (
    <div className="w-full">
      <div className="w-10/12 my-4 mx-auto">
        <div>
          <h2 className="itemLineWhite">今月のお休み</h2>
          <p className="pl-4 my-4 mx-auto"></p>
          <h2 className="itemLineWhite">その他お知らせ</h2>
          <p className="pl-4 my-4 mx-auto"></p>
        </div>
        <div style={{ lineHeight: 2 }}>
          <h2 className="itemLineWhite">採用情報</h2>
          <div className="rowItem">
            <div className="pl-4">
              <h3>仕事内容</h3>
              <h3>求める人材</h3>
              <h3>応募資格</h3>
              <h3>勤務時間・休日</h3>
              <h3>福利厚生</h3>
            </div>
            <div className="pl-8">{displayItem()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
