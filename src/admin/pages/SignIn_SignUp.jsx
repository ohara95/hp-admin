import React from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const SignIn_up = ({ history }) => {
  return (
    <div style={{ display: "flex", margin: "0 auto" }}>
      <SignIn history={history} />
      <SignUp history={history} />
    </div>
  );
};

export default SignIn_up;
