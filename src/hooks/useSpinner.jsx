import React, { useState, useContext, createContext } from "react";

// TODO: State useSpinner for whenever you want page loading (to avoid wasteful redefining)

const SpinnerContext = createContext();

export function SpinnerProvider(props) {
  const value = useProvideSpinner();

  return (
    <SpinnerContext.Provider value={value}>
      {props.children}
    </SpinnerContext.Provider>
  );
}

export function useSpinner() {
  return useContext(SpinnerContext);
}

function useProvideSpinner() {
  // Sidebar stuff doesn't belong here
  // I just need information to persist beyond route rerenders
  // This was laziest way
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return {
    loading,
    setLoading,
    sidebarOpen,
    setSidebarOpen,
  };
}
