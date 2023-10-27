import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signin, signinError, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    signin({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="authentication-container">
      <div className="authentication-box">
        <h1 className="authentication-heading">Login</h1>
        {signinError.length > 0 && (
          <div className="authentication-error-text">{signinError[0]}</div>
        )}
        <div className="authentication-input-container">
          <label className="authentication-label">Email</label>
          <input
            type="text"
            className="authentication-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="authentication-input-container">
          <label className="authentication-label">Password</label>
          <input
            type="password"
            className="authentication-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="authentication-button" onClick={handleLogin}>
          Login
        </button>
        <p className="authentication-login-link">
          Don't have an account?{" "}
          <Link to="/signup" className="authentication-link-text">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};


export default Login;
