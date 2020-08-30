import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebese";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cuisineMenu, setCuisineMenu] = useState([]);

  useEffect(() => {
    // 現在ログインしているユーザーを取得
    // ユーザーの切替を監視
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  /** メニュー取得*/
  useEffect(() => {
    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("cuisine")
      .doc("HcRIBsb7BXCTB27kZ4Nz")
      .collection("fried")
      .onSnapshot((snap) => {
        const menu = snap.docs.map((doc) => {
          return doc.data();
        });
        setCuisineMenu(menu);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, cuisineMenu }}>
      {children}
    </AuthContext.Provider>
  );
};
