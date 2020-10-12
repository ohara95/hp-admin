import { toMonth } from "./month";
import { format } from "date-fns";
import { Sales, Buys } from "../../types";

type ToggleTable = "chooseMonth" | "months" | "year" | "";

// 選択毎に一覧の表示を切替
export const changeDisplayList = (
  toggleTable: ToggleTable,
  DB: (Sales | Buys)[],
  chooseBtn: string
) => {
  switch (toggleTable) {
    case "months":
      return DB.filter(
        (data) => parseInt(format(data.date.toDate(), "MM")) === toMonth
      );
    case "year":
      return DB;
    case "chooseMonth":
      return DB.filter(
        (data) => format(data.date.toDate(), "MM") === chooseBtn
      );
    default:
      return DB;
  }
};
