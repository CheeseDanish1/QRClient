import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, signup, signupError, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    signup({ email, password, username, confirmPassword });
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="authentication-container">
      <div className="authentication-box">
        <h1 className="authentication-heading">Sign Up</h1>
        {signupError.length > 0 && (
          <div className="authentication-error-text">{signupError[0]}</div>
        )}
        <div className="authentication-input-container">
          <label className="authentication-label" style={styles.label}>
            Email
          </label>
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
        <button className="authentication-button" onClick={handleSignup}>
          Sign Up
        </button>
        <p className="authentication-login-link">
          Already have an account?{" "}
          <Link to="/login" className="authentication-link-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  // container: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: "100vh",
  //   background: "#f0f0f0",
  //   fontFamily: "arial",
  // },
  // signupBox: {
  //   width: "300px",
  //   padding: "20px",
  //   background: "rgba(255, 255, 255, 0.8)",
  //   borderRadius: "5px",
  //   boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  // },
  // heading: {
  //   fontSize: "24px",
  //   textAlign: "center",
  //   color: "#333",
  // },
  // errorText: {
  //   color: "red",
  //   textAlign: "center",
  //   marginBottom: "10px",
  // },
  // inputContainer: {
  //   margin: "10px 0",
  // },
  // label: {
  //   display: "block",
  //   marginBottom: "5px",
  //   color: "#333",
  // },
  // input: {
  //   width: "90%",
  //   padding: "10px",
  //   borderRadius: "5px",
  //   border: "1px solid #ccc",
  //   fontSize: "16px",
  // },
  // signupButton: {
  //   width: "100%",
  //   padding: "10px",
  //   background: "#2196f3",
  //   color: "#fff",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  //   fontSize: "16px",
  // },
  // loginLink: {
  //   marginTop: "10px",
  //   textAlign: "center",
  // },
  // linkText: {
  //   color: "#2196f3",
  //   textDecoration: "none",
  // },
};

export default Signup;
