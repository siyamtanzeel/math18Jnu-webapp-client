import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar";

function App() {
  return (
    <div className=" font-raleway scroll-smooth relative h-full w-full bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 py-20 transition-colors duration-300">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
