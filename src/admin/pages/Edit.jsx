import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecruitEdit from "../components/RecruitEdit";
import MenuEdit from "../components/MenuEdit";
import NoticeEdit from "../components/NoticeEdit";
import BanquetEdit from "../components/BanquetEdit";

const Edit = ({ history }) => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState("");
  const [editMenu, setEditMenu] = useState("");

  const [decision, setDecision] = useState(true);

  const onBtnSubmit = (e) => {
    e.preventDefault();
  };

  const onMenuSubmit = (e) => {
    e.preventDefault();
    setEditMenu(menu);
    setMenu("");
  };

  return (
    <>
      <h1>ホームページ編集</h1>
      <h1>
        <button
          onClick={() => {
            history.push("/management");
          }}
        >
          管理画面
        </button>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          ホームページ
        </button>
      </h1>
      <div>
        <h3>メニューページ</h3>
        <h4>メニュー</h4>
        <MenuEdit />
        <h4>宴会メニュー</h4>
        <BanquetEdit />
      </div>

      <div>
        <h3>お知らせページ</h3>
        <h5>求人</h5>
        <RecruitEdit />
        <h5>休日その他</h5>
        <NoticeEdit />
      </div>
    </>
  );
};

export default Edit;
