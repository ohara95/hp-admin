import React from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const SignIn_up = () => {
  return (
    <>
      <div>ログイン</div>
      <SignIn />
      <div>新規登録</div>
      <SignUp />
    </>
  );
};

export default SignIn_up;
