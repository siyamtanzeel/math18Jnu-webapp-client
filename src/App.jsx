import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import { useContext } from "react";
import { DarkModeContext } from "./Providers/DarkModeProvider";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className="bg-gradient-to-r from-sky-600 to-rose-600 scroll-smooth">
      <div className="relative max-w-6xl min-h-screen mx-auto font-raleway">
        <Navbar></Navbar>
        <div className="relative -mt-12 bg-base-100/90 backdrop-blur-md pt-10 left-0 w-full transition-colors duration-300">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
