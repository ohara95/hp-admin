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
  const [toggleTable, setToggleTable] = useState("month");
  const [monthDataArr, setMonthDataArr] = useState([]);

  const [salesEditOpen, setSalesEditOpen] = useState(false);
  const [buysEditOpen, setBuysEditOpen] = useState(false);

  const [dbSales, setDbSales] = useState([]);
  const [dbBuys, setDbBuys] = useState([]);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
          <div style={{ display: "flex" }}>
            <button
              id={db.id}
              onClick={inputPossible}
              class="flex-shrink-0 bg-white text-sm text-teal-500 py-1 px-2 rounded"
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              onClick={() => {
                deleteSales(db.id);
              }}
              class="flex-shrink-0 bg-white text-sm text-teal-500 py-1 px-2 rounded"
            >
              <i class="far fa-trash-alt"></i>
            </button>
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
  const inputPossible = (e) => {
    setEdit(!edit);
    salesEditBtn();
    return dbSales.map((db) => {
      if (e.target.id === db.id) {
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
              class="text-teal-500 "
            >
              <i class="far fa-edit" />
            </button>
            <button
              onClick={() => {
                deleteBuys(db.id);
              }}
              class="flex-shrink-0 bg-white text-sm text-teal-500 py-1 px-2 rounded"
            >
              <i class="far fa-trash-alt"></i>
            </button>
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

  /** 差額表示 */
  const difference = totalSales() - totalBuys();

  const setData = dbSales.concat(dbBuys);

  /** 同じ日付の金額足し算 */
  const sumData = (selectData) => {
    console.log(selectData);
    const res = [];
    for (const key of selectData) {
      const item = res.find((item) => key.date.seconds === item.date.seconds);
      if (item) {
        item.detail.push(key.detail);
        item.buysPrice.push(key.buysPrice);
        item.salesPrice.push(key.salesPrice);
        continue;
      }

      res.push({
        ...key,
        buysPrice: [key.buysPrice],
        salesPrice: [key.salesPrice],
        detail: [key.detail],
      });
    }
    return res;
  };

  const sumMonthData = (selectData) => {};

  /** 代案 */
  const testSum = () => {
    const set = new Set();
    const newArr = [];
    dbSales.forEach((sales) => {
      if (set.has(sales)) {
        newArr.forEach((data, i) => {
          if (sales.date === data.date) {
            newArr[i].salesPrice += data.salesPrice;
          }
        });
      } else {
        newArr.push(sales);
      }
      set.add(sales.date);
    });
    return newArr;
  };

  console.log(testSum());

  /** undefinedを除去 */
  const sumPrice = (price) => {
    let sum = 0;
    const noneUndefined = price.filter((d) => d !== undefined);
    for (let i = 0; i < noneUndefined.length; i++) {
      sum += noneUndefined[i];
    }
    return sum;
  };

  /** 日付順にソート */
  sumData(setData).sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  /** 表用のデータ(今月) */
  const pick = sumData(setData).map((data) => {
    if (toggleTable === "month") {
      if (Number(format(data.date.toDate(), "MM")) === toMonth) {
        return {
          日付: format(data.date.toDate(), "MM/dd"),
          売上: sumPrice(data.salesPrice),
          経費: sumPrice(data.buysPrice),
        };
      }
    }
  });

  /** 表用のデータ(月計) */
  // switch文で12ヶ月分分けたい
  // 条件文が思い浮かばない...正規表現だめ？
  // 正規表現のループできない
  const monthData = () => {
    let salesSum = 0;
    let buysSum = 0;
    let arr = [];
    const monthDataCalc = sumData(setData).map((key) => {
      const monthCorrect = format(key.date.toDate(), "MM"); //日付
      const calcSalesPrice = sumPrice(key.salesPrice);
      const calcBuysPrice = sumPrice(key.buysPrice);
    });
    return sumMonthData(monthDataCalc);
  };
  // const monthData = () => {
  //   let salesSum = 0;
  //   let buysSum = 0;
  //   const monthDataCalc = res.map((data) => {
  //     const monthCorrect = format(data.date.toDate(), "MM/dd");
  //     const monthReg = /^((0)[9])\/./;
  //     if (monthReg.test(monthCorrect)) {
  //       const calcSalesPrice = sumPrice(data.salesPrice);
  //       const calcBuysPrice = sumPrice(data.buysPrice);
  //       salesSum += calcSalesPrice;
  //       buysSum += calcBuysPrice;
  //       return {
  //         日付: "9月",
  //         売上: salesSum,
  //         経費: buysSum,
  //       };
  //     }
  //   });
  //   return monthDataCalc[monthDataCalc.length - 1];
  // };

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
          <form class="px-8 pt-6 pb-8 mb-4" onSubmit={minusSubmit}>
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
