import React from "react";

const Top = () => {
  return (
    <div style={{ height: "100%", color: "white", background: "black" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90%",
        }}
      >
        <p style={{ lineHeight: 2 }} className="slow-1">
          一人飲み、団体さん、女子会...
        </p>
        <p style={{ lineHeight: 2 }} className="slow-2">
          賑やかな店内で美味しい肴をつまみに
        </p>
        <p style={{ fontSize: 25, lineHeight: 2 }} className="slow-3">
          今夜は亮昌で一杯どうですか？
        </p>
      </div>
    </div>
  );
};

export default Top;
