import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";

type NoticeData = {
  holiday: string;
  other: string;
};

type RecruitData = {
  conditions: string;
  time: string;
  welfare: string;
  wont: string;
  work: string;
  [param: string]: string;
};

const Notice = () => {
  const [notice, setNotice] = useState<NoticeData[]>([]);
  const [recruit, setRecruit] = useState<RecruitData[]>([]);

  useEffect(() => {
    db.collection("notice").onSnapshot((snap) => {
      const notice = snap.docs.map((doc) => doc.data()) as NoticeData[];
      setNotice(notice);
    });

    db.collection("recruit").onSnapshot((snap) => {
      const recruit = snap.docs.map((doc) => doc.data()) as RecruitData[];
      setRecruit(recruit);
    });
  }, []);

  const displayItem = (data: RecruitData[]) => {
    let content = [];
    for (const key in data[0]) {
      content.push(<p>{data[0][key]}</p>);
    }
    return content;
  };

  console.log(notice);
  return (
    <div className="w-full">
      <div className="w-10/12 my-4 mx-auto">
        <div>
          <h2 className="itemLineWhite">今月のお休み</h2>
          <p className="pl-4 my-4 mx-auto">
            {notice.map((data) =>
              data.holiday
                .split(/\s/g)
                .reduce((cum: any, x) => [...cum, x, <br />], [])
                .slice(0, -1)
            )}
          </p>
          <h2 className="itemLineWhite">その他お知らせ</h2>
          <p className="pl-4 my-4 mx-auto">
            {notice.map((data) =>
              data.other
                .split(/\s/g)
                .reduce((cum: any, x) => [...cum, x, <br />], [])
                .slice(0, -1)
            )}
          </p>
        </div>
        <div className="leading-8">
          <h2 className="itemLineWhite">採用情報</h2>
          <div className="rowItem pl-4 my-4">
            <div>
              <h3>仕事内容</h3>
              <h3>求める人材</h3>
              <h3>応募資格</h3>
              <h3>勤務時間・休日</h3>
              <h3>福利厚生</h3>
            </div>
            <div className="pl-8">{displayItem(recruit)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
