import React from "react";
import store from "../../assets/img/inStore.jpg";
import counter from "../../assets/img/counter.jpg";
import takokara from "../../assets/img/takokara.jpeg";
import beel from "../../assets/img/beel.jpeg";
import sarada from "../../assets/img/images.jpeg";

const Menu = ({ history }) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <img src={store} style={{ width: "50%", height: 400 }} />
        <img src={counter} style={{ width: "50%", height: 415 }} />
      </div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        ホームへ
      </button>
      <h1>メニュー</h1>
      <h2>グランドメニュー</h2>
      <img src={takokara} />
      <img src={sarada} />
      <h2>ドリンク</h2>
      <img src={beel} />
      <h2>宴会コース</h2>
    </>
  );
};

export default Menu;
