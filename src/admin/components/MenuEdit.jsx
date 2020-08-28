import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const MenuEdit = () => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState("");
  const [editMenu, setEditMenu] = useState("");

  const [decision, setDecision] = useState(true);

  const onBtnSubmit = (e) => {
    e.preventDefault();
  };

  const onMenuSubmit = (e) => {
    e.preventDefault();
    setEditMenu(menu);
    setMenu("");
  };

  return (
    <>
      <div>
        <form onSubmit={onMenuSubmit}>
          <select class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>選択して下さい</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>

          <textarea
            class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="4"
            type="text"
            value={menu}
            onChange={(e) => {
              setMenu(e.target.value);
            }}
          />
          <button type="submit">送信</button>
        </form>
        {editMenu}
      </div>
    </>
  );
};

export default MenuEdit;
