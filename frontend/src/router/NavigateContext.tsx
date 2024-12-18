import React, { createContext, useContext } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

const NavigateContext = createContext<NavigateFunction | null>(null);

export const useNavigateContext = (): NavigateFunction => {
  const context = useContext(NavigateContext);
  if (!context) {
    throw new Error(
      "useNavigateContext must be used within a NavigateProvider"
    );
  }
  return context;
};

export const NavigateProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  );
};
