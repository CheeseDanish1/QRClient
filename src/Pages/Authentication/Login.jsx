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

const styles = {
  // container: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: "100vh",
  //   fontFamily: "arial",
  //   background: "#f0f0f0",
  // },
  // loginBox: {
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
  // loginButton: {
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

export default Login;
