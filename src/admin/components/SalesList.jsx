import React from "react";
import { db } from "../../config/firebese";
import { format } from "date-fns";

/** 売上一覧 */
const SalesList = ({
  dbSales,
  edit,
  setEdit,
  editId,
  setEditId,
  editSalesPrice,
  setEditSalesPrice,
}) => {
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
  return (
    <>
      {dbSales.map((db) => {
        return (
          <div>
            <div style={{ display: "flex", marginTop: 10 }}>
              <button
                id={db.id}
                onClick={(e) => {
                  inputPossible(e.target.id);
                }}
                class="text-teal-500 far fa-edit"
              />
              <button
                onClick={() => {
                  deleteSales(db.id);
                }}
                class="text-teal-500 py-1 px-2 far fa-trash-alt"
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
                  <button type="submit" class="fas fa-check" />
                </form>
              ) : (
                <p>{db.salesPrice}円</p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SalesList;
