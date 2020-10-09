import React, { FC } from "react";
import { db } from "../../config/firebese";
import { format } from "date-fns";
import { CustomInput } from "../../atoms";

type DBDATA = {
  buysPrice: number;
  date: firebase.firestore.Timestamp;
  detail: string;
  type: string;
  id: string;
};

type Props = {
  dbBuys: DBDATA[];
  buysEdit: boolean;
  setBuysEdit: (param: boolean) => void;
  buysEditId: string;
  setBuysEditId: (param: string) => void;
  editBuysDetail: string;
  setEditBuysDetail: (param: string) => void;
  editBuysPrice: string;
  setEditBuysPrice: (param: string) => void;
  changeBuysDB: () => DBDATA[];
};

/** 経費一覧 */
const BuysList: FC<Props> = ({
  dbBuys,
  buysEdit,
  setBuysEditId,
  setEditBuysDetail,
  setEditBuysPrice,
  editBuysDetail,
  setBuysEdit,
  editBuysPrice,
  buysEditId,
  changeBuysDB,
}) => {
  const buysRef = db
    .collection("management")
    .doc("NcmaRejmRabdytHQfbKU")
    .collection("buys");

  /** 経費項目編集 */
  const upDateBuys = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setEditBuysPrice("");
    setEditBuysDetail("");
    setBuysEdit(false);

    if (editBuysPrice) {
      buysRef
        .doc(id)
        .get()
        .then((res) => {
          res.ref.update({
            buysPrice: parseInt(editBuysPrice),
          });
        });
    }

    if (editBuysDetail) {
      buysRef
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
  const inputPossibleBuys = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setBuysEdit(!buysEdit);
    return dbBuys.map((db) => {
      if ((e.target as HTMLInputElement).id === db.id) {
        setBuysEditId(db.id);
      }
    });
  };

  /** 経費削除 */
  const deleteBuys = (id: string) => {
    buysRef
      .doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      });
  };
  return (
    <>
      {changeBuysDB().map((db) => {
        return (
          <div>
            <div className="flex mt-2">
              <button
                id={db.id}
                onClick={inputPossibleBuys}
                className="text-teal-500 far fa-edit"
              />
              <button
                onClick={() => {
                  deleteBuys(db.id);
                }}
                className="text-teal-500 py-1 px-2 far fa-trash-alt"
              />
              <p className="text-xl mr-2">
                {format(db.date.toDate(), "MM/dd")}
                &nbsp;
              </p>
              {buysEdit && buysEditId === db.id ? (
                <form
                  onSubmit={(e) => {
                    upDateBuys(e, db.id);
                  }}
                >
                  <div className="flex">
                    <CustomInput
                      type="number"
                      value={editBuysPrice}
                      onChange={(e) => {
                        setEditBuysPrice(e.target.value);
                      }}
                      placeholder={db.buysPrice.toString()}
                      plusStyle="w-24"
                    />
                    <CustomInput
                      type="text"
                      value={editBuysDetail.toString()}
                      onChange={(e) => {
                        setEditBuysDetail(e.target.value);
                      }}
                      placeholder={db.detail}
                      plusStyle="w-24"
                    />
                    <button type="submit" className="fas fa-check" />
                  </div>
                </form>
              ) : (
                <p className="text-xl">
                  {db.buysPrice.toLocaleString()}円 &nbsp;
                  <i className="fas fa-caret-right" />
                  &nbsp;
                  {db.detail}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BuysList;
