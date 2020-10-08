import React, { useState, useEffect } from "react";
import { db } from "../../config/firebese";
import { CustomLabel, CustomSelect } from "../../atoms";

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

  const menuRef = db.collection("menu").doc("ya3NEbDICuOTwfUWcHQs");

  const categoryArr = [
    { value: "none", name: "選択して下さい" },
    { value: "snack", name: "おつまみ" },
    { value: "salad", name: "サラダ" },
    { value: "grill", name: "焼き物" },
    { value: "fried", name: "揚げ物" },
    { value: "main", name: "ごはんもの" },
    { value: "dessert", name: "デザート" },
  ];

  /** データベースに変更を保存 */
  const addDBCuisine = (item, amount) => {
    const cuisineRef = menuRef.collection("cuisine");

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
    menuRef
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

    menuRef
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
    menuRef.collection(selectClassifying).onSnapshot((snap) => {
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
      return;
    }
  };

  // 大分類に応じて中分類セレクトを出す
  const selected = () => {
    switch (selectClassifying) {
      case "cuisine":
        return (
          <CustomSelect
            onChange={(e) => {
              setSelectCuisine(e.target.value);
            }}
          >
            {categoryArr.map((category) => {
              return <option value={category.value}>{category.name}</option>;
            })}
          </CustomSelect>
        );
      case "drink":
        return (
          <CustomSelect
            onChange={(e) => {
              setSelectDrink(e.target.value);
            }}
          >
            <option>選択して下さい</option>
            <option value="beer">ビール</option>
            <option value="sour">サワー</option>
            <option value="cocktail">カクテル</option>
            <option value="whisky">ウィスキー</option>
            <option value="shochu">焼酎</option>
            <option value="wine">ワイン</option>
            <option value="non-al">ノンアル</option>
          </CustomSelect>
        );
      case "recommend":
        return (
          <CustomSelect
            onChange={(e) => {
              setSelectRecommend(e.target.value);
            }}
          >
            <option>選択して下さい</option>
            <option value="cuisine">料理</option>
            <option value="drink">ドリンク</option>
          </CustomSelect>
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
      <div id="section1" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニュー" size="xl" />
            </div>
            <div className="md:w-2/3">
              <div
                onClick={(e) => {
                  setSelectMethod(e.target.value);
                }}
              >
                <button
                  className={`shadow hover:bg-gray-400 text-gray-800 ${
                    selectMethod === "add" ? "bg-gray-400 " : "bg-gray-100"
                  } font-bold py-2 px-4 rounded mr-4`}
                  type="button"
                  value="add"
                >
                  追加
                </button>

                <button
                  className={`shadow hover:bg-gray-400 text-gray-800 ${
                    selectMethod === "edit" ? "bg-gray-400 " : "bg-gray-100"
                  } font-bold py-2 px-4 rounded mr-4`}
                  type="button"
                  value="edit"
                >
                  変更
                </button>

                <button
                  className={`shadow hover:bg-gray-400 text-gray-800 ${
                    selectMethod === "delete" ? "bg-gray-400 " : "bg-gray-100"
                  } font-bold py-2 px-4 rounded mr-4`}
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
            <div className="md:w-2/3 border-gray-400 border-2 rounded">
              <CustomSelect
                onClick={methodCheck}
                onChange={(e) => {
                  setSelectClassifying(e.target.value);
                }}
              >
                <option value="none">選択して下さい</option>
                <option value="cuisine">料理</option>
                <option value="drink">ドリンク</option>
                <option value="recommend">おすすめ</option>
              </CustomSelect>
            </div>
          </div>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニューカテゴリ(中分類)" />
            </div>
            <div className="md:w-2/3 border-gray-400 border-2 rounded">
              {selected()}
            </div>
          </div>
          {((selectCuisine && selectMethod == "edit") ||
            selectMethod == "delete") && (
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <CustomLabel text="メニューカテゴリ(小分類)" />
              </div>
              <div className="md:w-2/3 border-gray-400 border-2 rounded">
                <CustomSelect>{editOption()}</CustomSelect>
              </div>
            </div>
          )}

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <CustomLabel text="メニュー名" />
              {selectMethod === "delete" && (
                <CustomLabel
                  text="※確認のためメニュー名を記入してください"
                  color="red"
                />
              )}
            </div>
            <div className="md:w-2/3">
              <input
                className="form-textarea block w-full border-gray-400 border-2 rounded py-3 px-3"
                value={toggleChange()}
                onChange={(e) => {
                  controlChange(e.target.value);
                }}
                rows={8}
              />
            </div>
          </div>
          {selectMethod !== "delete" && (
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <CustomLabel text="金額" />
              </div>
              <div className="md:w-2/3">
                <input
                  className="form-textarea block w-full border-gray-400 border-2 rounded py-3 px-3"
                  id="my-textarea"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  rows={8}
                />
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
