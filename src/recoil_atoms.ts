import { atom } from "recoil";
import { MenuData, BanquetData } from "./types";

export const banquetMenuData = atom<BanquetData[]>({
  key: "banquetMenuData",
  default: [],
});
