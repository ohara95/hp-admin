const monthData = () => {
  let salesSum = 0;
  let buysSum = 0;
  let arr = [];
  const monthDataCalc = sumData(setData).map((key) => {
    const monthCorrect = format(key.date.toDate(), "MM"); //日付
    const calcSalesPrice = key.salesPrice;
    const calcBuysPrice = key.buysPrice;
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
