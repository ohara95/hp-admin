import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";
import { CustomLabel, CustomSelect, SwitchButton } from "../../atoms";
import editMenuDb from "../utils/editMenuDb";
import SelectButton from "../utils/SelectButton";
import {
  category,
  cuisineCategory,
  drinkCategory,
  recommendCategory,
} from "../utils/optionData";
import MiddleCategory from "../utils/MiddleCategory";

type DBDATA = {
  amount: number;
  category: string;
  item: string;
  id: string;
};

// memo ボタンクリックを促す機能必要
// 一個でも間違ってると全部消えるの修正必要
const MenuEdit = () => {
  const [cuisine, setCuisine] = useState("");
  const [drink, setDrink] = useState("");
  const [recommend, setRecommend] = useState("");
  const [amount, setAmount] = useState("");
  const [selectMethod, setSelectMethod] = useState("");

  const [dbMenu, setDbMenu] = useState<DBDATA[]>([]);
  const [selectCuisine, setSelectCuisine] = useState("none");
  const [selectDrink, setSelectDrink] = useState("none");
  const [selectRecommend, setSelectRecommend] = useState("none");
  const [selectClassifying, setSelectClassifying] = useState("none");
  const [selectId, setSelectId] = useState("");

  const menuRef = db.collection("menu").doc("ya3NEbDICuOTwfUWcHQs");

  /** DBからデータ取得*/
  useEffect(() => {
    menuRef.collection(selectClassifying).onSnapshot((snap) => {
      const menu = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setDbMenu(menu as DBDATA[]);
    });
  }, [selectClassifying]);

  /** 値セット&DBに追加関数発火 */
  const onMenuSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (selectClassifying === "none") {
      return alert("カテゴリーを選択してください");
    }
    switch (selectClassifying) {
      case "cuisine":
        setCuisine("");
        setAmount("");
        editMenuDb(
          cuisine,
          amount,
          selectMethod,
          selectCuisine,
          selectClassifying,
          selectId
        );
        break;
      case "drink":
        setDrink("");
        setAmount("");
        editMenuDb(
          drink,
          amount,
          selectMethod,
          selectDrink,
          selectClassifying,
          selectId
        );
        break;
      case "recommend":
        setRecommend("");
        setAmount("");
        editMenuDb(
          recommend,
          amount,
          selectMethod,
          selectRecommend,
          selectClassifying,
          selectId
        );
        break;
      default:
    }
  };

  /** 大分類の値を制御 */
  const controlChange = (value: string) => {
    switch (selectClassifying) {
      case "cuisine":
        return setCuisine(value);
      case "drink":
        return setDrink(value);
      case "recommend":
        return setRecommend(value);
      default:
    }
  };

  /** 大分類のstateを選択 */
  const toggleChange = () => {
    switch (selectClassifying) {
      case "cuisine":
        return cuisine;
      case "drink":
        return drink;
      case "recommend":
        return recommend;
      default:
    }
  };

  // 大分類に応じて中分類セレクトを出す
  const selected = () => {
    if (selectClassifying === "cuisine") {
      return (
        <MiddleCategory
          setState={setSelectCuisine}
          optionData={cuisineCategory}
        />
      );
    }
    if (selectClassifying === "drink") {
      return (
        <MiddleCategory setState={setSelectDrink} optionData={drinkCategory} />
      );
    }
    if (selectClassifying === "recommend") {
      return (
        <MiddleCategory
          setState={setSelectRecommend}
          optionData={recommendCategory}
        />
      );
    }
  };

  /** 変更だったらメニュー名と金額をみれるようにする */
  const editOption = () => {
    let item = "";
    switch (selectClassifying) {
      case "cuisine":
        item = selectCuisine;
        break;
      case "drink":
        item = selectDrink;
        break;
      case "recommend":
        item = selectRecommend;
        break;
      default:
    }

    if (dbMenu) {
      const category = dbMenu.filter((el) => el.category === item);
      return category.map((el) => {
        return (
          <option key={el.id} value={el.id}>
            {el.item} ¥{el.amount}
          </option>
        );
      });
    }
  };

  return (
    <>
      <div id="section1" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニュー" size="xl" />
            </div>
            <SelectButton setState={setSelectMethod} select={selectMethod} />
          </div>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニューカテゴリ(大分類)" />
            </div>
            <div className="md:w-2/3 border-gray-400 border-2 rounded">
              <CustomSelect
                onChange={(e) => {
                  setSelectClassifying(e.target.value);
                }}
              >
                {category.map((category) => {
                  return (
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>
                  );
                })}
              </CustomSelect>
            </div>
          </div>
          {selectClassifying !== "none" && (
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <CustomLabel text="メニューカテゴリ(中分類)" />
              </div>
              <div className="md:w-2/3 border-gray-400 border-2 rounded">
                {selected()}
              </div>
            </div>
          )}
          {(selectCuisine || selectDrink || selectRecommend) !== "none" &&
            selectMethod !== "add" && (
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <CustomLabel text="メニューカテゴリ(小分類)" />
                </div>
                <div className="md:w-2/3 border-gray-400 border-2 rounded">
                  <CustomSelect onChange={(e) => setSelectId(e.target.value)}>
                    <option value="none">選択してください</option>
                    {editOption()}
                  </CustomSelect>
                </div>
              </div>
            )}
          {selectMethod !== "delete" && (
            <>
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <CustomLabel text="メニュー名" />
                </div>
                <div className="md:w-2/3">
                  <input
                    className="w-full border-gray-400 border-2 rounded py-3 px-3"
                    value={toggleChange()}
                    onChange={(e) => {
                      controlChange(e.target.value);
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
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    type="number"
                  />
                </div>
              </div>
            </>
          )}

          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-2/3">
              {selectMethod === "delete" ? (
                <button
                  className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded "
                  onClick={onMenuSubmit}
                >
                  削除
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                  onClick={onMenuSubmit}
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

export default MenuEdit;
