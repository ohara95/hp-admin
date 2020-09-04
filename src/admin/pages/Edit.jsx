import React from "react";
import RecruitEdit from "../components/RecruitEdit";
import MenuEdit from "../components/MenuEdit";
import NoticeEdit from "../components/NoticeEdit";
import BanquetEdit from "../components/BanquetEdit";

const Edit = ({ history }) => {
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
      <div class="flex justify-around">
        <div>
          <MenuEdit />
          <BanquetEdit />
        </div>
        <div>
          <RecruitEdit />
          <NoticeEdit />
        </div>
      </div>
    </>
  );
};

export default Edit;
