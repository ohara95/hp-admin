import React from "react";

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
      <div>
        <h4>メニューページ</h4>
        <form>
          <textarea type="text" />
          <button type="submit">送信</button>
        </form>
      </div>
      <div>
        <h4>お知らせページ</h4>
        <form>
          <textarea type="text" />
          <button type="submit">送信</button>
        </form>
      </div>
      <div>
        <h4>求人ページ</h4>
        <form>
          <textarea type="text" />
          <button type="submit">送信</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
