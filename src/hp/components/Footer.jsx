import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        borderTop: "solid 1px black",
      }}
    >
      <p style={{ textAlign: "center", bottom: 0 }}>
        <Link to="/management">sukemasa</Link>
      </p>
    </div>
  );
};
