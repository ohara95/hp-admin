import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../config/firebese";
// import {} from "../../store/noticeInput";

const BanquetEdit = () => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState([]);

  // ？コレクション名を取得してセレクトタグで使いたい
  useEffect(() => {
    db.collection("banquetMenu")
      .doc("DMosoArXIXVglOfOzpGo")
      .get()
      .then((res) => {
        console.log(res.data());
      });
  }, []);

  return (
    <>
      <div class="inline-block relative w-64">
        <form>
          <select class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="none">選択して下さい</option>
            <option value="3000">3000</option>
            <option value="5000">5000</option>
          </select>
          <textarea
            type="text"
            class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="4"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            送信
          </button>
        </form>
      </div>
      <div>
        <button>確認OK</button>
      </div>
    </>
  );
};

export default BanquetEdit;
