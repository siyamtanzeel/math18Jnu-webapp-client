import { createContext, useState } from "react";

export const DarkModeContext = createContext(null);
const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const exports = {
    darkMode,
    setDarkMode,
  };
  return (
    <DarkModeContext.Provider value={exports}>
      {children}
    </DarkModeContext.Provider>
  );
};
export default DarkModeProvider;
