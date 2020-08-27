import React from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const SignIn_up = ({ history }) => {
  return (
    <>
      <div>ログイン</div>
      <SignIn history={history} />
      <div>新規登録</div>
      <SignUp history={history} />
    </>
  );
};

export default SignIn_up;
