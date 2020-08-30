import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";

const Notice = () => {
  const [notice, setNotice] = useState("");
  const [recruit, setRecruit] = useState("");

  useEffect(() => {
    db.collection("notice").onSnapshot((snap) => {
      const notice = snap.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      setNotice(notice);
    });
  }, []);

  useEffect(() => {
    db.collection("recruit").onSnapshot((snap) => {
      const recruit = snap.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      setRecruit(recruit);
    });
  }, []);

  const displayItem = (item) => {
    if (notice) {
      switch (item) {
        case "holiday":
          return notice.map((el) => el.holiday);
        case "other":
          return notice.map((el) => el.other);
        default:
      }
    }
    if (recruit) {
      switch (item) {
        case "work":
          return recruit.map((el) => el.work);
        case "wont":
          return recruit.map((el) => el.wont);
        case "conditions":
          return recruit.map((el) => el.conditions);
        case "time":
          return recruit.map((el) => el.time);
        case "welfare":
          return recruit.map((el) => el.welfare);
        default:
      }
    }
  };

  return (
    <>
      <h1>お知らせ</h1>
      <div>
        <h2>今月のお休み</h2>
        <p>{displayItem("holiday")}</p>
        <h2>その他お知らせ</h2>
        <p>{displayItem("other")}</p>
      </div>
      <div>
        <h2>採用情報</h2>
        <h3>仕事内容</h3>
        <p>{displayItem("work")}</p>
        <h3>求める人材</h3>
        <p>{displayItem("wont")}</p>
        <h3>応募資格</h3>
        <p>{displayItem("conditions")}</p>
        <h3>勤務時間・休日</h3>
        <p>{displayItem("time")}</p>
        <h3>福利厚生</h3>
        <p>{displayItem("welfare")}</p>
      </div>
    </>
  );
};

export default Notice;
