import React, { FC } from "react";
import SignIn from "../template/SignIn";
import SignUp from "../template/SignUp";
import * as H from "history";

type Props = {
  history: H.History;
};

const SignIn_up: FC<Props> = ({ history }) => {
  return (
    <div className="flex justify-center">
      <SignIn history={history} />
      <SignUp history={history} />
    </div>
  );
};

export default SignIn_up;
