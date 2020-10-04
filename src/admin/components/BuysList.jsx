import React from "react";
import { db } from "../../config/firebese";
import { format } from "date-fns";

/** 経費一覧 */
const BuysList = ({
  dbBuys,
  buysEdit,
  setBuysEditId,
  setEditBuysDetail,
  setEditBuysPrice,
  editBuysDetail,
  setBuysEdit,
  editBuysPrice,
  buysEditId,
}) => {
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
  return (
    <>
      {dbBuys.map((db) => {
        return (
          <div>
            <div style={{ display: "flex", marginTop: 10 }}>
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
                  <div style={{ display: "flex" }}>
                    <input
                      type="number"
                      value={editBuysPrice}
                      onChange={(e) => {
                        setEditBuysPrice(e.target.value);
                      }}
                      placeholder={db.buysPrice}
                      style={{ width: 100 }}
                    />
                    <input
                      type="text"
                      value={editBuysDetail}
                      onChange={(e) => {
                        setEditBuysDetail(e.target.value);
                      }}
                      placeholder={db.detail}
                      style={{ width: 100 }}
                    />
                    <button type="submit" className="fas fa-check" />
                  </div>
                </form>
              ) : (
                <p>
                  {db.buysPrice}円 &nbsp;
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
