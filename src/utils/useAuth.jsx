import React, { useState, useContext, createContext } from "react";
import { login, logout, signup_auth, getUser } from "./api";

const AuthContext = createContext();

export function AuthProvider(props) {
  const value = useProvideAuth();

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const [signinError, setSigninError] = useState([]);
  const [signupError, setSignupError] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function isUser() {
    setIsLoading(true);

    let { data } = await getUser();
    setIsLoading(false);

    setUser(data.user);
  }

  function signin({ password, email }) {
    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      return setSigninError(["An email must be provided"]);
    }

    if (!password) {
      setIsLoading(false);
      return setSigninError(["A password must be provided"]);
    }

    const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!regex.test(email)) {
      setIsLoading(false);
      return setSigninError(["Must enter a valid email"]);
    }

    return login({ email, password }).then(({ data }) => {
      setIsLoading(false);

      if (!data.error) {
        setUser(data.user);
        setSigninError([]);
      } else setSigninError([data.message]);
    });
  }

  function signup({ password, email, username, confirmPassword }) {
    setSignupError([]);
    setIsLoading(true);

    if (!password) {
      setIsLoading(false);
      return setSignupError(["A password must be provided"]);
    }

    if (!email) {
      setIsLoading(false);
      return setSignupError(["An email must be provided"]);
    }

    if (!username) {
      setIsLoading(false);
      return setSignupError(["A username must be provided"]);
    }

    const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!regex.test(email)) {
      setIsLoading(false);
      return setSignupError(["Must enter a valid email"]);
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      return setSignupError(["Passwords must match"]);
    }

    signup_auth({
      password,
      email,
      username,
    }).then(({ data }) => {
      setIsLoading(false);
      if (!data.error) {
        setUser(data.user);
        setSignupError([]);
      } else setSignupError([data.message]);
    });
  }

  function addUserEvents(event) {
    setUser((prev) => {
      return {
        ...prev,
        events: [...prev.events, event],
      };
    });
  }

  function removeUserEvent(eventUUID) {
    setUser((prev) => {
      return {
        ...prev,
        events: prev.events.filter(e => e.uuid != eventUUID)
      }
    })
  }

  function signout() {
    return logout().then(({ data }) => {
      if (data.succuss) setUser(null);
    });
  }

  return {
    isUser,
    user,
    signin,
    signup,
    signout,
    isLoading,
    signupError,
    setSignupError,
    signinError,
    setSigninError,
    addUserEvents,
    removeUserEvent
  };
}
