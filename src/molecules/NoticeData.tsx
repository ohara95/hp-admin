import React, { FC } from "react";

type Props = {
  text: string;
  data: any;
};
const NoticeData: FC<Props> = ({ text, data }) => (
  <div className="flex pl-4 my-4 flex-col">
    <h3 className="justify-items-start">{text}</h3>
    <p className="justify-items-start pl-4 ">{data}</p>
  </div>
);

export default NoticeData;
