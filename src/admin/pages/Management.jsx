import React, { useState } from "react";
import { auth, db } from "../../config/firebese";
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
  const [editSalesPrice, setEditSalesPrice] = useState("");

  const [salesOpen, setSalesOpen] = useState(false);
  const [buysOpen, setBuysOpen] = useState(false);

  const [dbSales, setDbSales] = useState([]);
  const [dbBuys, setDbBuys] = useState([]);

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
      (cumulative, current) => cumulative + parseInt(current.salesPrice),
      0
    );
    return total;
  };
  /** 経費計算 */
  const totalBuys = () => {
    const total = dbBuys.reduce(
      (cumulative, current) => cumulative + parseInt(current.buysPrice),
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
          <p>
            {format(db.date.toDate(), "MM/dd")}
            &nbsp;
            <i class="fas fa-angle-down" />
          </p>
          {edit ? (
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

          <button
            id={db.id}
            name={db.change}
            onClick={inputPossible}
            class="flex-shrink-0 bg-white text-sm text-teal-500 py-1 px-2 rounded"
          >
            編集
          </button>
          <button
            onClick={() => {
              deleteSales(db.id);
            }}
            class="flex-shrink-0 bg-white text-sm text-teal-500 py-1 px-2 rounded"
          >
            削除
          </button>
        </div>
      );
    });
  };

  const upDateSales = (e, id) => {
    e.preventDefault();
    setEditSalesPrice("");
    if (editSalesPrice) {
      db.collection("management")
        .doc("NcmaRejmRabdytHQfbKU")
        .collection("sales")
        .doc(id)
        .get()
        .then((res) => {
          res.ref.update({
            salesPrice: editSalesPrice,
          });
        });
    }
  };

  const inputPossible = (e) => {
    dbSales.map((db) => {
      if (e.target.id === db.id) {
        setEdit(!edit);
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
          <p>
            {format(db.date.toDate(), "MM/dd")}
            &nbsp;
            <i class="fas fa-angle-down" />
          </p>
          <p>
            {db.buysPrice}円 &nbsp;
            <i class="fas fa-caret-right" />
            &nbsp;
            {db.detail}
          </p>
          <button class="flex-shrink-0 bg-white text-sm text-teal-500 py-1 px-2 rounded">
            編集
          </button>
          <button
            onClick={() => {
              deleteBuys(db.id);
            }}
            class="flex-shrink-0 bg-white text-sm text-teal-500 py-1 px-2 rounded"
          >
            削除
          </button>
        </div>
      );
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

  const salesOpenBtn = () => {
    setSalesOpen(!salesOpen);
  };
  const buysOpenBtn = () => {
    setBuysOpen(!buysOpen);
  };

  /** 差額表示 */
  const difference = totalSales() - totalBuys();

  const setData = dbSales.concat(dbBuys);

  /** 同じ日付の金額足し算 */
  const res = [];
  for (const key of setData) {
    const item = res.find((item) => key.date.seconds === item.date.seconds);
    if (item) {
      if (key.detail) item.detail.push(key.detail);
      if (key.buysPrice) item.buysPrice.push(key.buysPrice);
      if (key.salesPrice) item.salesPrice.push(key.salesPrice);
      continue;
    }

    res.push({
      ...key,
      buysPrice: [key.buysPrice],
      salesPrice: [key.salesPrice],
      detail: [key.detail],
    });
  }

  const sumPrice = (price) => {
    let sum = 0;
    const noneUndefined = price.filter((d) => d !== undefined);
    for (let i = 0; i < noneUndefined.length; i++) {
      sum += noneUndefined[i];
    }
    return sum;
  };

  /** 日付順にソート */
  res.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  const pick = res.map((data) => {
    return {
      日付: format(data.date.toDate(), "MM/dd"),
      売上: sumPrice(data.salesPrice),
      経費: sumPrice(data.buysPrice),
    };
  });

  // 表
  const data = [
    { month: "1月", 売上: 800, 経費: 1400 },
    { month: "2月", 売上: 967, 経費: 1506 },
  ];
  const salesChart = () => {
    return (
      <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
        width={600} //グラフ全体の幅を指定
        height={280} //グラフ全体の高さを指定
        data={pick} //ここにArray型のデータを指定
        margin={{ top: 20, right: 60, bottom: 0, left: 0 }} //marginを指定
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
      <div>
        <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-l ">
          月間
        </button>
        <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-r ">
          年間
        </button>
      </div>

      <div>{salesChart()}</div>

      <div class="flex justify-around mt-10">
        <div>
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={plusSubmit}
          >
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                売上日
              </label>
              <input
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                type="text"
                type="date"
                name="date"
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
                name="sales"
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
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={minusSubmit}
          >
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                出費日
              </label>
              <input
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                type="date"
                name="date"
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
                name="buys"
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
                name="detail"
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

      <div class="flex justify-around h-32 ">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto ">
          <h3 class="block text-gray-700 text-sm font-bold mb-2">売上計</h3>
          {totalSales() !== 0 && `${totalSales().toLocaleString()}円`}
          {salesOpen === false ? (
            <button onClick={salesOpenBtn}>
              &nbsp;
              <i class="fas fa-plus-circle" />
            </button>
          ) : (
            <button onClick={salesOpenBtn}>
              &nbsp;
              <i class="fas fa-minus-circle" />
            </button>
          )}
          {salesOpen && salesHistory()}
        </div>

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto">
          <h3 class="block text-gray-700 text-sm font-bold mb-2">経費計</h3>
          {totalBuys() !== 0 && `${totalBuys().toLocaleString()}円`}
          {buysOpen === false ? (
            <button onClick={buysOpenBtn}>
              &nbsp;
              <i class="fas fa-plus-circle" />
            </button>
          ) : (
            <button onClick={buysOpenBtn}>
              &nbsp;
              <i class="fas fa-minus-circle" />
            </button>
          )}

          {buysOpen && buysHistory()}
        </div>

        <div>
          <h3 class="block text-gray-700 text-sm font-bold mb-2">差額</h3>
          <p className={difference < 0 && "minus"}>
            {difference.toLocaleString()}
          </p>
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
