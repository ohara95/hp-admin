import React, { useState, useEffect } from "react";
import firebase, { db } from "../../config/firebese";

const BanquetEdit = () => {
  const [dbMenu, setDbMenu] = useState([]);
  const [operation, setOperation] = useState("");
  const [detail, setDetail] = useState("");
  const [menuTitle, setMenuTitle] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [selectItem, setSelectItem] = useState("");

  /** DBデータ取得 */
  useEffect(() => {
    db.collection("banquetMenu").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setDbMenu(data);
    });
  }, []);

  /** 金額一覧をセレクタに表示 */
  const selectMenu = () => {
    return dbMenu.map((select) => {
      return <option value={select.title}>{select.title}</option>;
    });
  };

  const editMenu = (e) => {
    e.preventDefault();
    setMenuTitle("");
    setMenuPrice("");
    setDetail("");

    const banquetRef = db.collection("banquetMenu");

    if (operation === "add") {
      banquetRef.doc().set({
        title: menuTitle,
        price: menuPrice,
        detail,
      });
    } else if (operation === "edit") {
      banquetRef
        .where("title", "==", selectItem)
        .get()
        .then((res) => {
          res.docs.map((doc) => {
            doc.ref.update({
              title: menuTitle,
              price: menuPrice,
              detail,
            });
          });
        });
    } else {
      banquetRef
        .where("title", "==", selectItem)
        .get()
        .then((res) => {
          res.docs.map((doc) => {
            doc.ref.delete();
          });
        });
    }
  };

  return (
    <>
      <div class="w-70">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={editMenu}
        >
          <h4>宴会メニュー</h4>
          <div
            class="inline-flex"
            onClick={(e) => {
              setOperation(e.target.value);
            }}
          >
            <button
              value="add"
              class="hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              追加
            </button>
            <button
              value="edit"
              class="hover:bg-gray-400 text-gray-800 font-bold py-2 px-4  "
            >
              変更
            </button>
            <button
              value="delete"
              class="hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              削除
            </button>
          </div>

          {operation !== "add" && (
            <select
              onChange={(e) => {
                setSelectItem(e.target.value);
              }}
              class="block appearance-none bg-white border border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none "
            >
              <option>選択して下さい</option>
              {selectMenu()}
            </select>
          )}
          {operation !== "delete" && (
            <>
              <div>
                <label>【名目】</label>
                <input
                  class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="4"
                  type="text"
                  value={menuTitle}
                  onChange={(e) => {
                    setMenuTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>【金額】</label>
                <input
                  class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="4"
                  type="number"
                  value={menuPrice}
                  onChange={(e) => {
                    setMenuPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>【詳細】</label>
                <textarea
                  type="text"
                  class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="4"
                  value={detail}
                  onChange={(e) => {
                    setDetail(e.target.value);
                  }}
                />
              </div>
            </>
          )}
          {operation === "delete" ? (
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              削除
            </button>
          ) : (
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              送信
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default BanquetEdit;
