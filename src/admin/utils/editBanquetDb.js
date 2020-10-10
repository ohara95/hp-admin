import { db } from "../../config/firebese";

export const editBanquetDb = (select, menuTitle, menuPrice, detail, id) => {
  const banquetRef = db.collection("banquetMenu");

  if (select === "add") {
    if (!menuTitle || !menuPrice || !detail) {
      return alert("入力してください");
    }
    banquetRef.doc().set({
      title: menuTitle,
      price: parseInt(menuPrice),
      detail,
    });
  } else if (select === "edit") {
    if (!menuTitle && !menuPrice && !detail) {
      return alert("入力漏れがあります");
    }
    if (menuTitle) {
      banquetRef.doc(id).update({
        title: menuTitle,
      });
    }
    if (menuPrice) {
      banquetRef.doc(id).update({
        price: parseInt(menuPrice),
      });
    }
    if (detail) {
      banquetRef.doc(id).update({
        detail,
      });
    }
  } else if (select === "delete") {
    banquetRef.doc(id).delete();
  }
};
