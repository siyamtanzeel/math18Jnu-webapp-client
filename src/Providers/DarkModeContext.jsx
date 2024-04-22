import { createContext, useState } from "react";

export const DarkModeContext = createContext(null);
const DarkModeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const html = document.querySelector("html");
  if (theme == "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  const info = {
    theme,
    setTheme,
  };
  return (
    <DarkModeContext.Provider value={info}>{children}</DarkModeContext.Provider>
  );
};
export default DarkModeProvider;
