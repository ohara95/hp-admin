import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../config/firebese";
import {
  setCuisine,
  addCuisine,
  setDrink,
  addDrink,
  setRecommend,
  addRecommend,
} from "../../store/menuInput";

const MenuEdit = () => {
  const dispatch = useDispatch();

  const cuisine = useSelector((state) => state.menu.cuisine);
  const drink = useSelector((state) => state.menu.drink);
  const recommend = useSelector((state) => state.menu.recommend);

  const editCuisine = useSelector((state) => state.menu.editCuisine);
  const editDrink = useSelector((state) => state.menu.editDrink);
  const editRecommend = useSelector((state) => state.menu.editRecommend);

  const [selectClassifying, setSelectClassifying] = useState("");
  const [selectCuisine, setSelectCuisine] = useState("");
  const [selectDrink, setSelectDrink] = useState("");
  const [selectRecommend, setSelectRecommend] = useState("");

  const [decision, setDecision] = useState(true);

  // 1回目空白で追加されちゃう
  const addDBCuisine = (item) => {
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

    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("cuisine")
      .doc("HcRIBsb7BXCTB27kZ4Nz")
      .collection(collectionName)
      .add({
        item,
      })
      .then(() => {
        console.log("seiko");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addDBDrink = (item) => {
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
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const addDBRecommend = (item) => {
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
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const onMenuSubmit = (e) => {
    e.preventDefault();
    switch (selectClassifying) {
      case "cuisine":
        dispatch(addCuisine(cuisine));
        dispatch(setCuisine(""));
        addDBCuisine(editCuisine);
        break;
      case "drink":
        dispatch(addDrink(drink));
        dispatch(setDrink(""));
        addDBDrink(editDrink);
        break;
      case "recommend":
        dispatch(addRecommend(recommend));
        dispatch(setRecommend(""));
        addDBRecommend(editRecommend);
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
              class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>選択して下さい</option>
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
        <form onSubmit={onMenuSubmit}>
          <select
            onChange={(e) => {
              setSelectClassifying(e.target.value);
            }}
            class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>選択して下さい</option>
            <option value="cuisine">料理</option>
            <option value="drink">ドリンク</option>
            <option value="recommend">おすすめ</option>
          </select>
          {selected()}

          <textarea
            class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="4"
            type="text"
            value={toggleChange()}
            onChange={(e) => {
              controlChange(e.target.value);
            }}
          />
          <button type="submit">送信</button>
        </form>
      </div>
    </>
  );
};

export default MenuEdit;
