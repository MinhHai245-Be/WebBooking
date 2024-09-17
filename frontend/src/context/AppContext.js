import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [dataUser, setDataUser] = useState()

  return (
    <AppContext.Provider value={{ isLogin, setIsLogin ,dataUser, setDataUser}}>
      {children}
    </AppContext.Provider>
  );
};
