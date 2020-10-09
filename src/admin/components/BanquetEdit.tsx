import React, { useState, useEffect } from "react";
import firebase, { db } from "../../config/firebese";
import { CustomLabel, CustomSelect } from "../../atoms";

type DBDATA = {
  amount: number;
  price: number;
  title: string;
};

const BanquetEdit = () => {
  const [dbMenu, setDbMenu] = useState<DBDATA[]>([]);
  const [operation, setOperation] = useState("");
  const [detail, setDetail] = useState("");
  const [menuTitle, setMenuTitle] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [selectItem, setSelectItem] = useState("");

  /** DBデータ取得 */
  useEffect(() => {
    db.collection("banquetMenu").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setDbMenu(data as DBDATA[]);
    });
  }, []);

  /** 金額一覧をセレクタに表示 */
  const selectMenu = () => {
    return dbMenu.map((select) => {
      return <option value={select.title}>{select.title}</option>;
    });
  };

  const editMenu = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMenuTitle("");
    setMenuPrice("");
    setDetail("");

    const banquetRef = db.collection("banquetMenu");

    if (operation === "add") {
      banquetRef.doc().set({
        title: menuTitle,
        price: parseInt(menuPrice),
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
              price: parseInt(menuPrice),
              detail: firebase.firestore.FieldValue.arrayUnion(detail),
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
      <div id="section2" className="p-8 mt-6 lg:mt-0 rounded">
        <form onSubmit={editMenu}>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="宴会メニュー" size="xl" />
            </div>
            <div className="md:w-2/3">
              <div
                className="pt-8"
                onClick={(e) => {
                  setOperation((e.target as HTMLInputElement).value);
                }}
              >
                <button
                  className={`shadow hover:bg-gray-400 text-gray-800 ${
                    operation === "add" ? "bg-gray-400 " : "bg-gray-100"
                  } font-bold py-2 px-4 rounded mr-4`}
                  type="button"
                  value="add"
                >
                  追加
                </button>
                <button
                  className={`shadow hover:bg-gray-400 text-gray-800 ${
                    operation === "edit" ? "bg-gray-400 " : "bg-gray-100"
                  } font-bold py-2 px-4 rounded mr-4`}
                  type="button"
                  value="edit"
                >
                  変更
                </button>
                <button
                  className={`shadow hover:bg-gray-400 text-gray-800 ${
                    operation === "delete" ? "bg-gray-400 " : "bg-gray-100"
                  } font-bold py-2 px-4 rounded mr-4`}
                  type="button"
                  value="delete"
                >
                  削除
                </button>
              </div>
            </div>
          </div>

          {operation !== "add" && (
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <CustomLabel text="投稿内容" />
              </div>
              <div className="md:w-2/3 border-gray-400 border-2 rounded">
                <CustomSelect
                  onChange={(e) => {
                    setSelectItem(e.target.value);
                  }}
                >
                  <option>選択して下さい</option>
                  {selectMenu()}
                </CustomSelect>
              </div>
            </div>
          )}
          {operation !== "delete" && (
            <>
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <CustomLabel text="コース名" />
                </div>
                <div className="md:w-2/3 ">
                  <input
                    className="block w-full border-gray-400 border-2 rounded py-3 px-3"
                    type="text"
                    value={menuTitle}
                    onChange={(e) => {
                      setMenuTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <CustomLabel text="金額" />
                </div>
                <div className="md:w-2/3">
                  <input
                    className="block w-full border-gray-400 border-2 rounded py-3 px-3"
                    type="number"
                    value={menuPrice}
                    onChange={(e) => {
                      setMenuPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="md:flex mb-6">
                  <div className="md:w-1/3">
                    <CustomLabel text="入力欄" />
                  </div>
                  <div className="md:w-2/3">
                    <textarea
                      className="block w-full focus:bg-white border-gray-400 border-2 rounded px-3 py-3"
                      rows={6}
                      value={detail}
                      onChange={(e) => {
                        setDetail(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              {operation === "delete" ? (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  削除
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  送信
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BanquetEdit;
