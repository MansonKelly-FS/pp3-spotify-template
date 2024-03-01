import React from "react";
import Input from "./Input";

const SignIn = (props) => {
  return (
    <form onSubmit={props.signin}>
      <Input
        id="email"
        type="text"
        name="email"
        value={props.email}
        placeholder="Email Address"
      />
      <Input
        id="password"
        type="text"
        name="password"
        value={props.password}
        placeholder="Password"
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignIn;