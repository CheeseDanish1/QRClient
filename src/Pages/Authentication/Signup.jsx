import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signup = () => {
  document.title = "Signup — Vending Promotions";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, signup, signupError } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ email, password, username, confirmPassword });
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="authentication-container">
      <form onSubmit={handleSignup} className="authentication-box">
        <h1 className="authentication-heading">Sign Up</h1>
        {signupError.length > 0 && (
          <div className="authentication-error-text">{signupError[0]}</div>
        )}
        <div className="authentication-input-container">
          <label className="authentication-label">Email</label>
          <input
            className="authentication-input-field"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="authentication-input-container">
          <label className="authentication-label">Username</label>
          <input
            type="text"
            className="authentication-input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="authentication-input-container">
          <label className="authentication-label">Confirm Password</label>
          <input
            type="password"
            className="authentication-input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="authentication-button">
          Sign Up
        </button>
        <p className="authentication-login-link">
          Already have an account?{" "}
          <Link to="/login" className="authentication-link-text">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
