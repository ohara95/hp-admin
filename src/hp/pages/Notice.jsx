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
    <div style={{ width: "100%" }}>
      <div style={{ width: "80%", margin: "10px auto" }}>
        <div>
          <h2 className="itemLineBlue">今月のお休み</h2>
          <p style={{ margin: "20px 0", paddingLeft: 10 }}>
            {displayItem("holiday")}
          </p>
          <h2 className="itemLineBlue">その他お知らせ</h2>
          <p style={{ margin: "20px 0", paddingLeft: 10 }}>
            {displayItem("other")}
          </p>
        </div>
        <div style={{ lineHeight: 2 }}>
          <h2 className="itemLineBlue">採用情報</h2>
          <div className="rowItem">
            <div style={{ paddingLeft: 10 }}>
              <h3>仕事内容</h3>
              <h3>求める人材</h3>
              <h3>応募資格</h3>
              <h3>勤務時間・休日</h3>
              <h3>福利厚生</h3>
            </div>
            <div style={{ marginLeft: 30 }}>
              <p>{displayItem("work")}</p>
              <p>{displayItem("wont")}</p>
              <p>{displayItem("conditions")}</p>
              <p>{displayItem("time")}</p>
              <p>{displayItem("welfare")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
