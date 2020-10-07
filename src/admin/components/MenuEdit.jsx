import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";
import CustomLabel from "../../atoms/CustomLabel";

const MenuEdit = () => {
  const [cuisine, setCuisine] = useState("");
  const [drink, setDrink] = useState("");
  const [recommend, setRecommend] = useState("");
  const [amount, setAmount] = useState("");
  const [selectMethod, setSelectMethod] = useState("");

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
          <select
            onChange={(e) => {
              setSelectCuisine(e.target.value);
            }}
            className="form-select block w-full focus:bg-white border rounded py-3"
          >
            <option value="none">選択して下さい</option>
            <option value="snack">おつまみ</option>
            <option value="salad">サラダ</option>
            <option value="grill">焼き物</option>
            <option value="fried">揚げ物</option>
            <option value="main">ごはんもの</option>
            <option value="dessert">デザート</option>
          </select>
        );
      case "drink":
        return (
          <select
            onChange={(e) => {
              setSelectDrink(e.target.value);
            }}
            className="form-select block w-full focus:bg-white border rounded"
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
        );
      case "recommend":
        return (
          <select
            onChange={(e) => {
              setSelectRecommend(e.target.value);
            }}
            className="form-select block w-full focus:bg-white border rounded"
          >
            <option>選択して下さい</option>
            <option value="cuisine">料理</option>
            <option value="drink">ドリンク</option>
          </select>
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

    /** 分類に応じてメニュー名選べる関数 */
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
      <div id="section1" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニュー" size="xl" />
            </div>
            <div className="md:w-2/3">
              <div
                className="pt-8"
                onClick={(e) => {
                  setSelectMethod(e.target.value);
                }}
              >
                <button
                  className={
                    selectMethod === "add"
                      ? "shadow hover:bg-gray-400 text-gray-800 bg-gray-400 font-bold py-2 px-4 rounded mr-4"
                      : "shadow hover:bg-gray-400 text-gray-800 bg-gray-100 font-bold py-2 px-4 rounded mr-4"
                  }
                  type="button"
                  value="add"
                >
                  追加
                </button>

                <button
                  className={
                    selectMethod === "edit"
                      ? "shadow hover:bg-gray-400 text-gray-800 bg-gray-400 font-bold py-2 px-4 rounded mr-4"
                      : "shadow hover:bg-gray-400 text-gray-800 bg-gray-100 font-bold py-2 px-4 rounded mr-4"
                  }
                  type="button"
                  value="edit"
                >
                  変更
                </button>

                <button
                  className={
                    selectMethod === "delete"
                      ? "shadow hover:bg-gray-400 text-gray-800 bg-gray-400 font-bold py-2 px-4 rounded mr-4"
                      : "shadow hover:bg-gray-400 text-gray-800 bg-gray-100 font-bold py-2 px-4 rounded mr-4"
                  }
                  type="button"
                  value="delete"
                >
                  削除
                </button>
              </div>
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニューカテゴリ(大分類)" />
            </div>
            <div className="md:w-2/3 border-gray-400 border">
              <select
                name=""
                className="form-select block w-full focus:bg-white rounded py-3"
                id="my-select"
                onClick={methodCheck}
                onChange={(e) => {
                  setSelectClassifying(e.target.value);
                }}
              >
                <option value="none">選択して下さい</option>
                <option value="cuisine">料理</option>
                <option value="drink">ドリンク</option>
                <option value="recommend">おすすめ</option>
              </select>
            </div>
          </div>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニューカテゴリ(中分類)" />
            </div>
            <div className="md:w-2/3 border-gray-400 border">{selected()}</div>
          </div>
          {((selectCuisine && selectMethod == "edit") ||
            selectMethod == "delete") && (
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <CustomLabel text="メニューカテゴリ(小分類)" />
              </div>
              <div className="md:w-2/3 border-gray-400 border">
                <select className="form-select block w-full focus:bg-white rounded py-3">
                  {editOption()}
                </select>
              </div>
            </div>
          )}

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニュー名" />
            </div>
            <div className="md:w-2/3">
              <input
                className="form-textarea block w-full focus:bg-white border rounded py-3"
                id="my-textarea"
                value={toggleChange()}
                onChange={(e) => {
                  controlChange(e.target.value);
                }}
                rows={8}
              />
            </div>
          </div>
          {selectMethod === "delete" ? (
            <p style={{ color: "red" }}>
              ※確認のためメニュー名を記入して下さい
            </p>
          ) : (
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <CustomLabel text="金額" />
              </div>
              <div className="md:w-2/3">
                <input
                  className="form-textarea block w-full focus:bg-white border rounded py-3"
                  id="my-textarea"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  rows={8}
                ></input>
              </div>
            </div>
          )}

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
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
