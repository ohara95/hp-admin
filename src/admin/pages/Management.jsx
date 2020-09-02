import React, { useState } from "react";
import { auth, db } from "../../config/firebese";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { useEffect } from "react";

const Management = ({ history }) => {
  const [salesDate, setSalesDate] = useState(null);
  const [buysDate, setBuysDate] = useState(null);
  const [salesPrice, setSalesPrice] = useState("");
  const [buysPrice, setBuysPrice] = useState("");
  const [buysDetail, setBuysDetail] = useState("");
  const [fixedDate, setFixedDate] = useState(null);
  const [fixedItem, setFixedItem] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");

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
        date,
        salesPrice: price,
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

  const buysDB = (date, price, detail, type) => {
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
      .collection("buys")
      .doc()
      .set({
        date,
        buysPrice: price,
        detail,
        type,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const totalSales = () => {
    const total = dbSales.reduce(
      (cumulative, current) => cumulative + parseInt(current.salesPrice),
      0
    );
    return total;
  };

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
          {db.date}/{db.salesPrice}円
          <button class="flex-shrink-0 bg-white text-sm text-teal-500 py-1 px-2 rounded">
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
          {db.date}/{db.buysPrice}円:{db.detail}
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

  // 表
  const salesChart = () => {
    return (
      <div style={{ width: 100, height: 100, marginLeft: 50 }}>
        <ResponsiveContainer>
          <AreaChart width={500} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" interval={0} />
            <YAxis
              ticks={[0, 5000, 10000, 50000, 100000, 200000, 300000]}
              unit="円"
            />
            <Tooltip />
            <Area />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const onFixedSubmit = (e) => {
    e.preventDefault();
    setFixedDate("");
    setFixedItem("");
    setFixedPrice("");
    fixedDB(fixedDate, fixedItem, fixedPrice);
  };

  const fixedDB = (date, item, price) => {
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
      .collection("fixed")
      .doc()
      .set({
        date,
        item,
        price,
      });
  };

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

      <div>{salesChart()}</div>

      <div>
        <form onSubmit={plusSubmit}>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">
              売上
            </label>
            <input
              class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              type="text"
              type="date"
              name="date"
              value={salesDate}
              onChange={(e) => setSalesDate(e.target.value)}
            />
            ¥
            <input
              class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              type="number"
              name="sales"
              value={salesPrice}
              onChange={(e) => setSalesPrice(e.target.value)}
            />
            <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
              計上
            </button>
          </div>
        </form>
        <form onSubmit={minusSubmit}>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">
              経費
            </label>
            <input
              class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              type="date"
              name="date"
              value={buysDate}
              onChange={(e) => setBuysDate(e.target.value)}
            />
            ¥
            <input
              class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              type="number"
              name="buys"
              value={buysPrice}
              onChange={(e) => setBuysPrice(e.target.value)}
            />
            <input
              class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              type="text"
              name="detail"
              value={buysDetail}
              onChange={(e) => setBuysDetail(e.target.value)}
            />
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
        <h3>売上計</h3>
        {totalSales() !== 0 && totalSales()}
        {salesOpen === false ? (
          <button onClick={salesOpenBtn}>一覧表示</button>
        ) : (
          <button onClick={salesOpenBtn}>一覧非表示</button>
        )}
        {salesOpen && salesHistory()}
      </div>

      <div>
        <h3>経費計</h3>
        {totalBuys() !== 0 && totalBuys()}
        {buysOpen === false ? (
          <button onClick={buysOpenBtn}>一覧表示</button>
        ) : (
          <button onClick={buysOpenBtn}>一覧非表示</button>
        )}
        {buysOpen && buysHistory()}
      </div>

      <div>
        <h3>差額</h3>
        <p className={difference < 0 && "minus"}>{difference}</p>
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
