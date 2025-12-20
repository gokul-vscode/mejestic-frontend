import React, { useState } from "react";
import "../Login/Login.css";
import api from "../api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (isLogin) {
    try {
      const res = await api.post("auth/login/", { email, password });

      localStorage.setItem("token", res.data.token.access);
      localStorage.setItem("username", res.data.user.name); // ⭐ IMPORTANT

      alert("Login successful!");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  } else {
    try {
      await api.post("auth/signup/", { name, email, password });
      alert("Signup successful!");
      setName("");
      setEmail("");
      setPassword("");
      setIsLogin(true);
    } catch (err) {
  console.log(err.response);
  alert(err.response?.data?.error || "Login failed");
}

  }
  
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <p className="subtitle">
          {isLogin ? "Welcome back, please login" : "Create your account"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <div className="divider">OR</div>

        <button className="google-btn">Continue with Google</button>

        <p className="toggle-text">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
