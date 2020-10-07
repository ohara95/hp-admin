import React, { FC } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import * as H from "history";

type Props = {
  history: H.History;
};

const SignIn_up: FC<Props> = ({ history }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SignIn history={history} />
      <SignUp history={history} />
    </div>
  );
};

export default SignIn_up;