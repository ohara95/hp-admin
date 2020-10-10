import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";
import { CustomLabel, CustomSelect, CustomTextarea } from "../../atoms";
import SelectButton from "../utils/SelectButton";
import { editBanquetDb } from "../utils/editBanquetDb";

type DBDATA = {
  amount: number;
  price: number;
  title: string;
  id: string;
};

// memo ボタンクリックを促す機能必要
// 一個でも間違ってると全部消えるの修正必要
const BanquetEdit = () => {
  const [dbMenu, setDbMenu] = useState<DBDATA[]>([]);
  const [operation, setOperation] = useState("");
  const [detail, setDetail] = useState("");
  const [menuTitle, setMenuTitle] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [selectId, setSelectId] = useState("");

  /** DBデータ取得 */
  useEffect(() => {
    db.collection("banquetMenu").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setDbMenu(data as DBDATA[]);
    });
  }, []);

  /** 金額一覧をセレクタに表示 */
  const selectMenu = () => {
    return dbMenu.map((select) => {
      return (
        <option key={select.id} value={select.id}>
          {select.title}
        </option>
      );
    });
  };

  const editMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setMenuTitle("");
    setMenuPrice("");
    setDetail("");
    editBanquetDb(operation, menuTitle, menuPrice, detail, selectId);
  };

  return (
    <>
      <div id="section2" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="コースメニュー" size="xl" />
            </div>
            <SelectButton setState={setOperation} select={operation} />
          </div>

          {operation !== "add" && (
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <CustomLabel text="コース選択" />
              </div>
              <div className="md:w-2/3 border-gray-400 border-2 rounded">
                <CustomSelect
                  onChange={(e) => {
                    setSelectId(e.target.value);
                  }}
                >
                  <option value="none">選択して下さい</option>
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
                    className="w-full border-gray-400 border-2 rounded py-3 px-3"
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
                    className="w-full border-gray-400 border-2 rounded py-3 px-3"
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
                    <CustomTextarea
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
                <button
                  onClick={editMenu}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  削除
                </button>
              ) : (
                <button
                  onClick={editMenu}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
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
