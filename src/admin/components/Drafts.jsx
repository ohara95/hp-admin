// const monthData = () => {
//   let salesSum = 0;
//   let buysSum = 0;
//   let arr = [];
//   const monthDataCalc = sumData(setData).map((key) => {
//     const monthCorrect = format(key.date.toDate(), "MM"); //日付
//     const calcSalesPrice = key.salesPrice;
//     const calcBuysPrice = key.buysPrice;
//   });
//   return sumMonthData(monthDataCalc);
// };
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

// switch (monthCorrect) {
//   case "01":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "1月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "02":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "2月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "03":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "3月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "04":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "4月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "05":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "5月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "06":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "6月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "07":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "7月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "08":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "8月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "09":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "9月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "10":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "10月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "11":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "11月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   case "12":
//     calcSalesPrice = sumPrice(key.salesPrice);
//     calcBuysPrice = sumPrice(key.buysPrice);
//     salesSum += calcSalesPrice;
//     buysSum += calcBuysPrice;
//     return {
//       日付: "12月",
//       売上: salesSum,
//       経費: buysSum,
//     };
//   default:
//     break;
// }
// });

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

// switch文で12ヶ月分分けたい
// 条件文が思い浮かばない...正規表現だめ？
// 正規表現のループできない

// for (const fee of fees) {
//   const item = res.find((item) => fee.name === item.name);
//   if (item) {
//     // resで作った配列にpush
//     item.description.push(fee.description);
//     item.id.push(fee.id);
//     continue;
//   }

//   res.push({
//     ...fee,
//     // 配列にしたいやつを配列にする
//     description: [fee.description],
//     id: [fee.id],
//   });
// }

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

// const [fixedDate, setFixedDate] = useState(null);
// const [fixedItem, setFixedItem] = useState("");
// const [fixedPrice, setFixedPrice] = useState("");

{
  /* <div>
        <h3>固定費登録</h3>
        <form onSubmit={onFixedSubmit}>
          <label classname="block text-gray-700 text-sm font-bold mb-2">
            支払日
          </label>
          <input
            type="date"
            value={fixedDate}
            onChange={(e) => {
              setFixedDate(e.target.value);
            }}
            classname="appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          />
          <label classname="block text-gray-700 text-sm font-bold mb-2">項目</label>
          <input
            type="text"
            value={fixedItem}
            onChange={(e) => {
              setFixedItem(e.target.value);
            }}
            classname="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          />
          <label classname="block text-gray-700 text-sm font-bold mb-2">金額</label>
          <input
            type="number"
            value={fixedPrice}
            onChange={(e) => {
              setFixedPrice(e.target.value);
            }}
            classname="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          />
          <button classname="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
            登録
          </button>
        </form>
      </div> */
}

{
  /* <div classname="shadow flex">
            <input
              classname="w-full rounded p-2"
              type="text"
              placeholder="Search..."
            />
            <button classname="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400 fas fa-search"></button>
          </div> */
}

// 一覧月別表示
//     <div onClick={monthBtnClick}>
//       <select
//         onChange={(e) => {
//           setSalesSelectMonth(e.target.value);
//         }}
//         classname="bg-teal-500 hover:bg-teal-700 text-white py-1 px-3 rounded"
//       >
//         <option value="all">年間</option>
//         <option value="01">1月</option>
//         <option value="02">2月</option>
//         <option value="03">3月</option>
//         <option value="04">4月</option>
//         <option value="05">5月</option>
//         <option value="06">6月</option>
//         <option value="07">7月</option>
//         <option value="08">8月</option>
//         <option value="09">9月</option>
//         <option value="10">10月</option>
//         <option value="11">11月</option>
//         <option value="12">12月</option>
//       </select>
//     </div>;

// const filterData = dbSales.filter(
//   (data) => format(data.date.toDate(), "MM") == salesSelectMonth
// );

// const [salesSelectMonth, setSalesSelectMonth] = useState("all");
// const [buysSelectMonth, setBuysSelectMonth] = useState("all");

{
  /* <div style={{ width: "100%" }}> */
}
{
  /* <img src={store} style={{ width: "50%", height: 400 }} />
        <img src={counter} style={{ width: "50%", height: 415 }} /> */
}
{
  /* </div> */
}
