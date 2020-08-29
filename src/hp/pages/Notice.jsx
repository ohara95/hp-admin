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

  const holiday = () => {
    if (notice) {
      return notice.map((el) => el.holiday);
    }
  };

  const other = () => {
    if (notice) {
      return notice.map((el) => el.other);
    }
  };

  const work = () => {
    if (recruit) {
      return recruit.map((el) => el.work);
    }
  };

  const wont = () => {
    if (recruit) {
      return recruit.map((el) => el.wont);
    }
  };

  const conditions = () => {
    if (recruit) {
      return recruit.map((el) => el.conditions);
    }
  };

  const time = () => {
    if (recruit) {
      return recruit.map((el) => el.time);
    }
  };
  const welfare = () => {
    if (recruit) {
      return recruit.map((el) => el.welfare);
    }
  };

  return (
    <>
      <h1>お知らせ</h1>
      <div>
        <h2>今月のお休み</h2>
        <p>{holiday()}</p>
        <h2>その他お知らせ</h2>
        <p>{other()}</p>
      </div>
      <div>
        <h2>採用情報</h2>
        <h3>仕事内容</h3>
        <p>{work()}</p>
        <h3>求める人材</h3>
        <p>{wont()}</p>
        <h3>応募資格</h3>
        <p>{conditions()}</p>
        <h3>勤務時間・休日</h3>
        <p>{time()}</p>
        <h3>福利厚生</h3>
        <p>{welfare()}</p>
      </div>
    </>
  );
};

export default Notice;
