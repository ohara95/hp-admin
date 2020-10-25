import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";
import NoticeData from "../../molecules/NoticeData";
import Skeleton from "../../atoms/Skeleton";
// import { useDocument } from "react-firebase-hooks/firestore";

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

  // const [values, loading, error] = useDocument(
  //   db.collection("notice").doc("f3068OjZY4BqCj3QiLjO"),
  //   {}
  // );

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

  const recruitData = recruit.find((db) => db);

  return (
    <div className="w-full">
      <div className="w-10/12 my-4 mx-auto">
        <div>
          <h2 className="itemLineWhite">今月のお休み</h2>
          <p className="pl-4 my-4 mx-auto">
            {notice.length ? (
              notice.map((data) =>
                data.holiday
                  .split(/\s/g)
                  .reduce((cum: any, x) => [...cum, x, <br />], [])
                  .slice(0, -1)
              )
            ) : (
              <Skeleton />
            )}
          </p>
          <h2 className="itemLineWhite">その他お知らせ</h2>
          <p className="pl-4 my-4 mx-auto">
            {notice.length ? (
              notice.map((data) =>
                data.other
                  .split(/\s/g)
                  .reduce((cum: any, x) => [...cum, x, <br />], [])
                  .slice(0, -1)
              )
            ) : (
              <Skeleton />
            )}
          </p>
        </div>
        <div className="leading-8">
          <h2 className="itemLineWhite">採用情報</h2>
          {recruitData?.work ? (
            <NoticeData text="仕事内容" data={recruitData?.work} />
          ) : (
            <Skeleton />
          )}
          {recruitData?.work ? (
            <NoticeData text="求める人材" data={recruitData?.wont} />
          ) : (
            <Skeleton />
          )}
          {recruitData?.work ? (
            <NoticeData text="応募資格" data={recruitData?.conditions} />
          ) : (
            <Skeleton />
          )}
          {recruitData?.work ? (
            <NoticeData text="勤務時間・休日" data={recruitData?.time} />
          ) : (
            <Skeleton />
          )}
          {recruitData?.work ? (
            <NoticeData text="福利厚生" data={recruitData?.welfare} />
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;
