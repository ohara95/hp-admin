import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState("/top");

  return (
    <AuthContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </AuthContext.Provider>
  );
};
