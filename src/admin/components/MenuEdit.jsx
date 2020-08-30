import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../config/firebese";
import { useForm } from "react-hook-form";
import {
  setCuisine,
  addCuisine,
  setDrink,
  addDrink,
  setRecommend,
  addRecommend,
  setAmount,
  addAmount,
} from "../../store/menuInput";

const MenuEdit = () => {
  const dispatch = useDispatch();

  const {
    cuisine,
    drink,
    recommend,
    editCuisine,
    editDrink,
    editRecommend,
    amount,
    editAmount,
  } = useSelector((state) => state.menu);
  const { register, handleSubmit, errors } = useForm();
  const { cuisineMenu } = useContext(AuthContext);

  const [selectClassifying, setSelectClassifying] = useState("");
  const [selectCuisine, setSelectCuisine] = useState("");
  const [selectDrink, setSelectDrink] = useState("");
  const [selectRecommend, setSelectRecommend] = useState("");
  const [selectMethod, setSelectMethod] = useState("");
  const [decision, setDecision] = useState(true);

  // 1回目空白で追加されちゃう
  const addDBCuisine = (item, amount) => {
    let collectionName = "";
    switch (selectCuisine) {
      case "snack":
        collectionName = "snack";
        break;
      case "salad":
        collectionName = "salad";
        break;
      case "grill":
        collectionName = "grill";
        break;
      case "fried":
        collectionName = "fried";
        break;
      case "main":
        collectionName = "main";
        break;
      case "dessert":
        collectionName = "dessert";
        break;
      default:
    }

    if (selectMethod === "add") {
      db.collection("menu")
        .doc("ya3NEbDICuOTwfUWcHQs")
        .collection("cuisine")
        .doc("HcRIBsb7BXCTB27kZ4Nz")
        .collection(collectionName)
        .add({
          item,
          amount,
        })
        .then()
        .catch((err) => {
          console.log(err);
        });
    } else {
      db.collection("menu")
        .doc("ya3NEbDICuOTwfUWcHQs")
        .collection("cuisine")
        .doc("HcRIBsb7BXCTB27kZ4Nz")
        .collection(collectionName)
        .where("item", "==", item)
        .get()
        .then((res) => {
          res.docs.map((el) => {
            el.ref.update({});
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addDBDrink = (item, amount) => {
    let collectionName = "";

    switch (selectDrink) {
      case "beer":
        collectionName = "beer";
        break;
      case "sour":
        collectionName = "sour";
        break;
      case "whisky":
        collectionName = "whisky";
        break;
      case "shochu":
        collectionName = "shochu";
        break;
      case "cocktail":
        collectionName = "cocktail";
        break;
      case "wine":
        collectionName = "wine";
        break;
      case "non-al":
        collectionName = "non-al";
        break;
      default:
    }

    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("drink")
      .doc("nI1ZsGE1mZEDquwrXRew")
      .collection(collectionName)
      .add({
        item,
        amount,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const addDBRecommend = (item, amount) => {
    let collectionName = "";

    switch (selectRecommend) {
      case "cuisine":
        collectionName = "cuisine";
        break;
      case "drink":
        collectionName = "drink";
        break;
      default:
    }

    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("recommend")
      .doc("wG9VgTatur5QEKTGmxYQ")
      .collection(collectionName)
      .add({
        item,
        amount,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const onMenuSubmit = (e) => {
    e.preventDefault();
    if (
      !selectClassifying &&
      (!selectCuisine || !selectDrink || !selectRecommend)
    ) {
      alert("選択して下さい");
    }

    dispatch(addAmount(amount));
    dispatch(setAmount(""));
    switch (selectClassifying) {
      case "cuisine":
        dispatch(addCuisine(cuisine));
        dispatch(setCuisine(""));
        addDBCuisine(editCuisine, editAmount);
        break;
      case "drink":
        dispatch(addDrink(drink));
        dispatch(setDrink(""));
        addDBDrink(editDrink, editAmount);
        break;
      case "recommend":
        dispatch(addRecommend(recommend));
        dispatch(setRecommend(""));
        addDBRecommend(editRecommend, editAmount);
        break;
      default:
    }
  };

  const controlChange = (value) => {
    switch (selectClassifying) {
      case "cuisine":
        return dispatch(setCuisine(value));
      case "drink":
        return dispatch(setDrink(value));
      case "recommend":
        return dispatch(setRecommend(value));
      default:
    }
  };

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
    if (cuisineMenu) {
      return cuisineMenu.map((el) => {
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
      <button
        onClick={() => {
          console.log(editCuisine);
        }}
      >
        push
      </button>
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
        </div>
        <form onSubmit={onMenuSubmit}>
          <select
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
          {selectCuisine && selectMethod === "edit" && (
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
          <div>
            【金額】
            <input
              class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="4"
              type="number"
              value={amount}
              onChange={(e) => {
                dispatch(setAmount(e.target.value));
              }}
            />
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            送信
          </button>
        </form>
      </div>
    </>
  );
};

export default MenuEdit;
