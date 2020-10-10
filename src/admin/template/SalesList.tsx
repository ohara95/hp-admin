import React, { FC } from "react";
import { db } from "../../config/firebese";
import { format } from "date-fns";

type DBDATA = {
  salesPrice: number;
  date: firebase.firestore.Timestamp;
  detail: string;
  type: string;
  id: string;
};

type Props = {
  dbSales: DBDATA[];
  edit: boolean;
  setEdit: (param: boolean) => void;
  editId: string;
  setEditId: (param: string) => void;
  editSalesPrice: string;
  setEditSalesPrice: (param: string) => void;
  changeSalesDB: () => DBDATA[];
};

/** 売上一覧 */
const SalesList: FC<Props> = ({
  dbSales,
  edit,
  setEdit,
  editId,
  setEditId,
  editSalesPrice,
  setEditSalesPrice,
  changeSalesDB,
}) => {
  const salesRef = db
    .collection("management")
    .doc("NcmaRejmRabdytHQfbKU")
    .collection("sales");

  /** 売上項目編集 */
  const upDateSales = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setEditSalesPrice("");
    setEdit(false);
    if (editSalesPrice) {
      salesRef
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
  const inputPossible = (id: string) => {
    setEdit(!edit);
    return dbSales.map((db) => {
      if (id === db.id) setEditId(db.id);
    });
  };

  /** 売上削除 */
  const deleteSales = (id: string) => {
    salesRef
      .doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {changeSalesDB().map((db) => {
        return (
          <div key={db.id}>
            <div className="flex mt-2">
              <button
                id={db.id}
                onClick={(e) => {
                  inputPossible((e.target as HTMLInputElement).id);
                }}
                className="text-teal-500 far fa-edit"
              />
              <button
                onClick={() => {
                  deleteSales(db.id);
                }}
                className="text-teal-500 py-1 px-2 far fa-trash-alt"
              />
              <p className="text-xl mr-2">
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
                    placeholder={db.salesPrice.toString()}
                  />
                  <button type="submit" className="fas fa-check" />
                </form>
              ) : (
                <p className="text-xl">{db.salesPrice.toLocaleString()}円</p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SalesList;
