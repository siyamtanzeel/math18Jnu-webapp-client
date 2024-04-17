import React from "react";
import NavList from "./NavList";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 shadow-md rounded-b-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Admin Panel</a>
      </div>
      <div className="flex-none">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-success text-white drawer-button lg:hidden">
              Menu
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"></label>
            <NavList></NavList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
