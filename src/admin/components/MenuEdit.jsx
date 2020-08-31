import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";
import { useForm } from "react-hook-form";

const MenuEdit = () => {
  const [cuisine, setCuisine] = useState("");
  const [drink, setDrink] = useState("");
  const [recommend, setRecommend] = useState("");
  const [amount, setAmount] = useState("");
  const [selectMethod, setSelectMethod] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const [dbMenu, setDbMenu] = useState([]);
  const [selectCuisine, setSelectCuisine] = useState("snack");
  const [selectDrink, setSelectDrink] = useState("beer");
  const [selectRecommend, setSelectRecommend] = useState("cuisine");
  const [selectClassifying, setSelectClassifying] = useState("cuisine");

  /** データベースに変更を保存 */
  const addDBCuisine = (item, amount) => {
    const cuisineRef = db
      .collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("cuisine");

    if (selectMethod === "add") {
      cuisineRef.add({
        item,
        amount,
        category: selectCuisine,
      });
    } else if (selectMethod === "edit") {
      cuisineRef
        .where("item", "==", item)
        .get()
        .then((res) => {
          res.docs.map((el) => {
            el.ref.update({
              item,
              amount,
              category: selectCuisine,
            });
          });
        });
    } else if (selectMethod === "delete") {
      cuisineRef
        .where("item", "==", item)
        .get()
        .then((res) => {
          res.docs.map((el) => {
            el.ref.delete();
          });
        });
    }
  };

  /** DBにドリンクデータ追加 */
  const addDBDrink = (item, amount) => {
    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("drink")
      .add({
        item,
        amount,
        category: selectDrink,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  /** DBにおすすめデータ追加 */
  const addDBRecommend = (item, amount) => {
    if (!selectRecommend) {
      return;
    }

    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("recommend")
      .add({
        item,
        amount,
        category: selectRecommend,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  /** DBからデータ取得*/
  useEffect(() => {
    let category = "";

    switch (selectClassifying) {
      case "cuisine":
        category = "cuisine";
        break;
      case "drink":
        category = "drink";
        break;
      case "recommend":
        category = "recommend";
        break;
      default:
    }

    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection(category)
      .onSnapshot((snap) => {
        const menu = snap.docs.map((doc) => {
          return doc.data();
        });
        setDbMenu(menu);
      });
  }, [selectClassifying]);

  /** 値セット&DBに追加関数発火 */
  const onMenuSubmit = (e) => {
    e.preventDefault();
    if (
      !selectClassifying &&
      (!selectCuisine || !selectDrink || !selectRecommend)
    ) {
      alert("選択して下さい");
    }

    if (
      (!cuisine && !amount) ||
      (!drink && !amount) ||
      (!recommend && !amount)
    ) {
      alert("入力漏れがあります");
      return;
    }

    switch (selectClassifying) {
      case "cuisine":
        setCuisine("");
        setAmount("");
        addDBCuisine(cuisine, amount);
        break;
      case "drink":
        setDrink("");
        setAmount("");
        addDBDrink(drink, amount);
        break;
      case "recommend":
        setRecommend("");
        setAmount("");
        addDBRecommend(recommend, amount);
        break;
      default:
    }
  };

  /** 大分類の値を制御 */
  const controlChange = (value) => {
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
        return null;
    }
  };

  /**追加か変更が押されてなかったら注意 */
  const methodCheck = () => {
    if (selectMethod === "") {
      alert("追加or変更or削除を選択して下さい");
    }
  };

  // 大分類に応じて中分類セレクトを出す
  const selected = () => {
    switch (selectClassifying) {
      case "cuisine":
        return (
          <div>
            <select
              onChange={(e) => {
                setSelectCuisine(e.target.value);
              }}
              class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="none">選択して下さい</option>
              <option value="snack">おつまみ</option>
              <option value="salad">サラダ</option>
              <option value="grill">焼き物</option>
              <option value="fried">揚げ物</option>
              <option value="main">ごはんもの</option>
              <option value="dessert">デザート</option>
            </select>
          </div>
        );
      case "drink":
        return (
          <div>
            <select
              onChange={(e) => {
                setSelectDrink(e.target.value);
              }}
              class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>選択して下さい</option>
              <option value="beer">ビール</option>
              <option value="sour">サワー</option>
              <option value="cocktail">カクテル</option>
              <option value="whisky">ウィスキー</option>
              <option value="shochu">焼酎</option>
              <option value="wine">ワイン</option>
              <option value="non-al">ノンアル</option>
            </select>
          </div>
        );
      case "recommend":
        return (
          <div>
            <select
              onChange={(e) => {
                setSelectRecommend(e.target.value);
              }}
              class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>選択して下さい</option>
              <option value="cuisine">料理</option>
              <option value="drink">ドリンク</option>
            </select>
          </div>
        );

      default:
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
          <option>
            {el.item}¥{el.amount}
          </option>
        );
      });
    }
  };

  return (
    <>
      <div>
        <div
          onClick={(e) => {
            setSelectMethod(e.target.value);
          }}
          class="inline-flex"
        >
          <button
            value="add"
            class="hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            追加
          </button>
          <button
            value="edit"
            class="hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
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
        <form>
          <select
            onClick={methodCheck}
            onChange={(e) => {
              setSelectClassifying(e.target.value);
            }}
            class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
          >
            <option value="none">選択して下さい</option>
            <option value="cuisine">料理</option>
            <option value="drink">ドリンク</option>
            <option value="recommend">おすすめ</option>
          </select>
          {selected()}
          {((selectCuisine && selectMethod == "edit") ||
            selectMethod == "delete") && (
            <div>
              <select class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                {editOption()}
              </select>
            </div>
          )}

          <div>
            【名目】
            <input
              class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="4"
              type="text"
              value={toggleChange()}
              onChange={(e) => {
                controlChange(e.target.value);
              }}
            />
          </div>
          {selectMethod === "delete" ? (
            <div style={{ color: "red" }}>※確認のため名目を記入して下さい</div>
          ) : (
            <div>
              【金額】
              <input
                class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
          )}
          {selectMethod === "delete" ? (
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={onMenuSubmit}
            >
              削除
            </button>
          ) : (
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={onMenuSubmit}
            >
              送信
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default MenuEdit;
