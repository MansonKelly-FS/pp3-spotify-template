import "../App.css";
import React from "react";


function Login() {
  return (
	<div className="login">
			<form>
				<h1>Sign up / Login</h1>
				<input type="text" name="email" placeholder="Email Address" />

				<input type="text" name="password" placeholder="Password" />
				<input type="submit" value="Submit" />
			</form>
		</div>
  );
}

export default Login;
