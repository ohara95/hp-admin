import React, { useState } from "react";
import { auth, db } from "../../config/firebese";
import BuysTodo from "../components/BuysTodo";
import "./management.scss";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  Bar,
  ComposedChart,
} from "recharts";
import { useEffect } from "react";
import { format } from "date-fns";
import { FormProvider } from "react-hook-form";

const Management = ({ history }) => {
  const [salesDate, setSalesDate] = useState(null);
  const [buysDate, setBuysDate] = useState(null);
  const [salesPrice, setSalesPrice] = useState("");
  const [buysPrice, setBuysPrice] = useState("");
  const [buysDetail, setBuysDetail] = useState("");
  const [fixedDate, setFixedDate] = useState(null);
  const [fixedItem, setFixedItem] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editSalesPrice, setEditSalesPrice] = useState("");
  const [buysEdit, setBuysEdit] = useState(false);
  const [buysEditId, setBuysEditId] = useState("");
  const [editBuysPrice, setEditBuysPrice] = useState("");
  const [editBuysDetail, setEditBuysDetail] = useState("");
  const [toggleTable, setToggleTable] = useState("months");
  const [monthDataArr, setMonthDataArr] = useState([]);

  const [salesEditOpen, setSalesEditOpen] = useState(false);
  const [buysEditOpen, setBuysEditOpen] = useState(false);

  const [dbSales, setDbSales] = useState([]);
  const [dbBuys, setDbBuys] = useState([]);
  const setData = dbSales.concat(dbBuys);

  // const today = new Date().toISOString().slice(0, 10);
  const today = new Date();
  const toMonth = today.getMonth() + 1;

  const plusSubmit = (e) => {
    e.preventDefault();
    setSalesPrice("");
    setSalesDate("");
    salesDB(salesDate, salesPrice, "sales");
  };

  /** 売上をDBに登録 */
  const salesDB = (date, price, type) => {
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
      .collection("sales")
      .doc()
      .set({
        date: new Date(date),
        salesPrice: parseInt(price),
        type,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const minusSubmit = (e) => {
    e.preventDefault();
    setBuysPrice("");
    setBuysDate("");
    setBuysDetail("");
    buysDB(buysDate, buysPrice, buysDetail, "buys");
  };

  /** 経費をDBに登録 */
  const buysDB = (date, price, detail, type) => {
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
      .collection("buys")
      .doc()
      .set({
        date: new Date(date),
        buysPrice: parseInt(price),
        detail,
        type,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  /** 売上計算 */
  const totalSales = () => {
    const total = dbSales.reduce(
      (cumulative, current) => cumulative + current.salesPrice,
      0
    );
    return total;
  };
  /** 経費計算 */
  const totalBuys = () => {
    const total = dbBuys.reduce(
      (cumulative, current) => cumulative + current.buysPrice,
      0
    );
    return total;
  };

  /** salesData取得 */
  useEffect(() => {
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
      .collection("sales")
      .orderBy("date")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setDbSales(data);
      });
  }, []);

  /** buysData取得 */
  useEffect(() => {
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
      .collection("buys")
      .orderBy("date")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setDbBuys(data);
      });
  }, []);

  /** 売上一覧 */
  const salesHistory = () => {
    return dbSales.map((db) => {
      return (
        <div>
          <div style={{ display: "flex" }}>
            <button
              id={db.id}
              onClick={(e) => {
                inputPossible(e.target.id);
              }}
              class="text-teal-500 py-1 px-2 rounded far fa-edit"
            />
            <button
              onClick={() => {
                deleteSales(db.id);
              }}
              class="text-teal-500 py-1 px-2 rounded far fa-trash-alt"
            />
            <p>
              {format(db.date.toDate(), "MM/dd")}
              &nbsp;
            </p>
            {edit && editId === db.id ? (
              <form
                onSubmit={(e) => {
                  upDateSales(e, db.id);
                }}
              >
                <input
                  type="number"
                  value={editSalesPrice}
                  onChange={(e) => {
                    setEditSalesPrice(e.target.value);
                  }}
                  placeholder={db.salesPrice}
                />
                <button type="submit">決定</button>
              </form>
            ) : (
              <p>{db.salesPrice}円</p>
            )}
          </div>
        </div>
      );
    });
  };

  /** 売上項目編集 */
  const upDateSales = (e, id) => {
    e.preventDefault();
    setEditSalesPrice("");
    setEdit(false);
    if (editSalesPrice) {
      db.collection("management")
        .doc("NcmaRejmRabdytHQfbKU")
        .collection("sales")
        .doc(id)
        .get()
        .then((res) => {
          res.ref.update({
            salesPrice: parseInt(editSalesPrice),
          });
        });
    }
  };

  /** 押した編集ボタンのID取得(売上) */
  const inputPossible = (id) => {
    setEdit(!edit);
    salesEditBtn();
    return dbSales.map((db) => {
      if (id === db.id) {
        setEditId(db.id);
      }
    });
  };

  /** 売上削除 */
  const deleteSales = (id) => {
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
      .collection("sales")
      .doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      });
  };

  /** 経費一覧 */
  const buysHistory = () => {
    return dbBuys.map((db) => {
      return (
        <div>
          <div style={{ display: "flex" }}>
            <button
              id={db.id}
              onClick={inputPossibleBuys}
              class="text-teal-500 far fa-edit"
            />
            <button
              onClick={() => {
                deleteBuys(db.id);
              }}
              class="text-teal-500 py-1 px-2 rounded far fa-trash-alt"
            />
            <p>
              {format(db.date.toDate(), "MM/dd")}
              &nbsp;
            </p>
            {buysEdit && buysEditId === db.id ? (
              <form
                onSubmit={(e) => {
                  upDateBuys(e, db.id);
                }}
              >
                <input
                  type="number"
                  value={editBuysPrice}
                  onChange={(e) => {
                    setEditBuysPrice(e.target.value);
                  }}
                  placeholder={db.buysPrice}
                />
                <input
                  type="text"
                  value={editBuysDetail}
                  onChange={(e) => {
                    setEditBuysDetail(e.target.value);
                  }}
                  placeholder={db.detail}
                />
                <button type="submit">決定</button>
              </form>
            ) : (
              <p>
                {db.buysPrice}円 &nbsp;
                <i class="fas fa-caret-right" />
                &nbsp;
                {db.detail}
              </p>
            )}
          </div>
        </div>
      );
    });
  };

  /** 経費項目編集 */
  const upDateBuys = (e, id) => {
    e.preventDefault();
    setEditBuysPrice("");
    setEditBuysDetail("");
    setBuysEdit(false);
    if (editBuysPrice) {
      db.collection("management")
        .doc("NcmaRejmRabdytHQfbKU")
        .collection("buys")
        .doc(id)
        .get()
        .then((res) => {
          res.ref.update({
            buysPrice: parseInt(editBuysPrice),
          });
        });
    }

    if (editBuysDetail) {
      db.collection("management")
        .doc("NcmaRejmRabdytHQfbKU")
        .collection("buys")
        .doc(id)
        .get()
        .then((res) => {
          res.ref.update({
            detail: editBuysDetail,
          });
        });
    }
  };

  /** 押した編集ボタンのID取得(経費) */
  const inputPossibleBuys = (e) => {
    setBuysEdit(!buysEdit);
    return dbBuys.map((db) => {
      if (e.target.id === db.id) {
        setBuysEditId(db.id);
      }
    });
  };

  /** 経費削除 */
  const deleteBuys = (id) => {
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
      .collection("buys")
      .doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      });
  };

  const salesEditBtn = () => {
    setSalesEditOpen(!salesEditOpen);
  };
  const buysEditOpenBtn = () => {
    setBuysEditOpen(!buysEditOpen);
  };

  /** 同じ日付の金額足し算 */
  const sumData = (selectData) => {
    const res = [];
    for (const key of selectData) {
      const item = res.find((item) => key.date.seconds === item.date.seconds);
      if (item) {
        // resで作った配列にpush
        if (item.detail && key.detail) {
          item.detail.push(key.detail);
        }
        if (item.buysPrice && key.buysPrice) {
          item.buysPrice.push(key.buysPrice);
        }
        if (item.salesPrice && key.salesPrice) {
          item.salesPrice.push(key.salesPrice);
        }
        continue;
      }
      if (key.detail && key.buysPrice && key.salesPrice) {
        res.push({
          ...key,
          buysPrice: [key.buysPrice],
          salesPrice: [key.salesPrice],
          detail: [key.detail],
        });
      } else if (key.salesPrice) {
        res.push({
          ...key,
          buysPrice: [0],
          salesPrice: [key.salesPrice],
          detail: [],
        });
      } else if (key.buysPrice && key.detail) {
        res.push({
          ...key,
          buysPrice: [key.buysPrice],
          salesPrice: [0],
          detail: [key.detail],
        });
      }
    }
    return res;
  };

  const sumMonthData = (selectData) => {};

  /** 配列内の合算 */
  const sumPrice = (price) => {
    let sum = 0;
    for (let i = 0; i < price.length; i++) {
      sum += price[i];
    }
    return sum;
  };

  /** 差額表示 */
  const difference = totalSales(dbSales) - totalBuys(dbBuys);

  /** 日付順にソート */
  sumData(setData).sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  /** 表用のデータ(今月) */
  const graphData = sumData(setData)
    .filter((data) => Number(format(data.date.toDate(), "MM")) === toMonth)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: sumPrice(data.salesPrice),
        経費: sumPrice(data.buysPrice),
      };
    });

  /** 表用のデータ(月計) */
  const monthData = () => {
    let arr = [];
    const totalData = sumData(setData);

    for (const key of totalData) {
      const item = arr.find(
        (data) =>
          format(data.date.toDate(), "MM") === format(key.date.toDate(), "MM")
      );
      if (item) {
        if (item.salesPrice === 0) {
          item.salesPrice += parseInt(key.salesPrice);
        } else if (Array.isArray(item.salesPrice)) {
          if (Array.isArray(key.salesPrice)) {
            item.salesPrice.concat(key.salesPrice);
          } else {
            item.salesPrice.push(key.salesPrice);
          }
        }
        if (item.buysPrice === 0) {
          item.buysPrice += parseInt(key.buysPrice);
        } else if (Array.isArray(item.buysPrice)) {
          if (Array.isArray(key.buysPrice)) {
            item.buysPrice.concat(key.buysPrice);
          } else {
            item.buysPrice.push(key.buysPrice);
          }
        }
      }
      arr.push({
        ...key,
      });
    }
    const newArr = arr.map((data) => {
      return {
        日付: `${format(data.date.toDate(), "MM")}月`,
        売上: sumPrice(data.salesPrice),
        経費: sumPrice(data.buysPrice),
      };
    });
    return newArr;
  };

  // 表
  const salesChart = () => {
    return (
      <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
        width={600} //グラフ全体の幅を指定
        height={280} //グラフ全体の高さを指定
        data={toggleTable === "months" ? graphData : monthData()} //ここにArray型のデータを指定
        style={{ margin: "0 auto" }}
      >
        <XAxis
          dataKey="日付" //Array型のデータの、X軸に表示したい値のキーを指定
          interval={0}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid //グラフのグリッドを指定
          stroke="#f5f5f5" //グリッド線の色を指定
        />
        <Area //面積を表すグラフ
          type="monotone" //グラフが曲線を描くように指定。default値は折れ線グラフ
          dataKey="経費" //Array型のデータの、Y軸に表示したい値のキーを指定
          stroke="#00aced" ////グラフの線の色を指定
          fillOpacity={1} ////グラフの中身の薄さを指定
          fill="rgba(0, 172, 237, 0.2)" //グラフの色を指定
        />
        <Bar //棒グラフ
          dataKey="売上" //Array型のデータの、Y軸に表示したい値のキーを指定
          barSize={20} //棒の太さを指定
          stroke="rgba(34, 80, 162, 0.2)" ////レーダーの線の色を指定
          fillOpacity={1} //レーダーの中身の色の薄さを指定
          fill="#2250A2" ////レーダーの中身の色を指定
        />
      </ComposedChart>
    );
  };

  // 固定費
  // const onFixedSubmit = (e) => {
  //   e.preventDefault();
  //   setFixedDate("");
  //   setFixedItem("");
  //   setFixedPrice("");
  //   fixedDB(fixedDate, fixedItem, fixedPrice);
  // };

  // const fixedDB = (date, item, price) => {
  //   db.collection("management")
  //     .doc("NcmaRejmRabdytHQfbKU")
  //     .collection("fixed")
  //     .doc()
  //     .set({
  //       date,
  //       item,
  //       price,
  //     });
  // };

  return (
    <>
      <h1>管理画面</h1>
      <button
        onClick={() => {
          history.push("/edit");
        }}
      >
        ホームページ編集
      </button>
      <div style={{ width: "100%" }}>
        <div
          onClick={(e) => {
            setToggleTable(e.target.value);
          }}
          style={{ width: 300, margin: "0 auto" }}
        >
          <button
            value="months"
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-l "
          >
            月間
          </button>
          <button
            value="months"
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 "
          >
            月別
          </button>
          <button
            value="year"
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-r "
          >
            年間
          </button>
        </div>
      </div>

      <div>{salesChart()}</div>

      <div
        style={{ display: "flex", width: "90%", margin: "0 auto" }}
        class="bg-white shadow-md rounded "
      >
        <div>
          <form class="px-8 pt-6 pb-8 mb-4" onSubmit={plusSubmit}>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                売上日
              </label>
              <input
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                type="text"
                type="date"
                date="date"
                value={salesDate}
                onChange={(e) => setSalesDate(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                売上額
              </label>
              <input
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                type="number"
                date="sales"
                value={salesPrice}
                onChange={(e) => setSalesPrice(e.target.value)}
              />
            </div>
            <div>
              <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                計上
              </button>
            </div>
          </form>
        </div>

        <div>
          <form class="px-8 pt-6 pb-8 mb-4" onSubmit={minusSubmit}>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                出費日
              </label>
              <input
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                type="date"
                date="date"
                value={buysDate}
                onChange={(e) => setBuysDate(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                出費額
              </label>
              <input
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                type="number"
                date="buys"
                value={buysPrice}
                onChange={(e) => setBuysPrice(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                出費明細
              </label>
              <input
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                type="text"
                date="detail"
                value={buysDetail}
                onChange={(e) => setBuysDetail(e.target.value)}
              />
            </div>
            <div>
              <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                計上
              </button>
            </div>
          </form>
        </div>

        {/* <div>
        <h3>固定費登録</h3>
        <form onSubmit={onFixedSubmit}>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            支払日
          </label>
          <input
            type="date"
            value={fixedDate}
            onChange={(e) => {
              setFixedDate(e.target.value);
            }}
            class="appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">項目</label>
          <input
            type="text"
            value={fixedItem}
            onChange={(e) => {
              setFixedItem(e.target.value);
            }}
            class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">金額</label>
          <input
            type="number"
            value={fixedPrice}
            onChange={(e) => {
              setFixedPrice(e.target.value);
            }}
            class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          />
          <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
            登録
          </button>
        </form>
      </div> */}

        <div>
          <div class="px-8 pt-6 pb-8">
            <h3 class="block text-gray-700 text-sm font-bold mb-2">売上計</h3>
            {totalSales() !== 0 && `${totalSales().toLocaleString()}円`}
          </div>

          <div class="px-8 pt-6 pb-8 mb-4">
            <h3 class="block text-gray-700 text-sm font-bold mb-2">経費計</h3>
            {totalBuys() !== 0 && `${totalBuys().toLocaleString()}円`}
          </div>

          <div class="px-8 pt-6 pb-8 mb-4">
            <h3>差額</h3>
            <p className={difference < 0 && "minus"}>
              {difference.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "90%",
          margin: "30px auto",
        }}
        class="bg-white shadow-md rounded "
      >
        <div
          class="px-8 pt-6 pb-8 mb-4 "
          style={{ height: 400, width: "30%", overflow: "scroll" }}
        >
          売上表
          {salesHistory()}
        </div>
        <div
          class="px-8 pt-6 pb-8 mb-4"
          style={{ height: 400, width: "30%", overflow: "scroll" }}
        >
          経費表
          {buysHistory()}
        </div>
        <div
          class="px-8 pt-6 pb-8 mb-4"
          style={{ height: 400, width: "30%", overflow: "scroll" }}
        >
          買い物リスト
          <BuysTodo />
        </div>
      </div>

      <button
        class="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
        onClick={() => auth.signOut()}
      >
        ログアウト
      </button>
    </>
  );
};
export default Management;
