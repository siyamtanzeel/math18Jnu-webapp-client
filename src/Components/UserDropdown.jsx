import React, { useState, useEffect, useRef } from "react";

export default function UserDropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const wrapperRef = useRef(null);

  const navigationItems = [
    {
      linkName: "Log Out",
    },
    {
      linkName: "Analytics",
    },
    {
      linkName: "User Profile",
    },
  ];

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleKeyDown = (e) => {
    if (isOpen) {
      e.preventDefault();

      switch (e.keyCode) {
        // KeyDown
        case 40:
          if (currentItem === navigationItems.length - 1) {
            setCurrentItem(0);
          } else {
            setCurrentItem(currentItem + 1);
          }
          break;
        // KeyUp
        case 38:
          if (currentItem === 0) {
            setCurrentItem(navigationItems.length - 1);
          } else {
            setCurrentItem(currentItem - 1);
          }
          break;
        // Escape
        case 27:
          setCurrentItem(1);
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      {/* <!-- Component: Basic dropdown menu--> */}
      <div className="relative inline-flex " id="dropdown">
        {/*  <!--  Start Dropdown trigger --> */}
        <button
          className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded  px-5 text-sm font-medium tracking-wide text-white transition duration-300  focus-visible:outline-none disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-300 disabled:shadow-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? " true" : "false"}
          ref={wrapperRef}>
          <span className="relative only:-mx-5">
            <img
              src="https://shorturl.at/uAJUZ"
              className="w-12 rounded-full"
              alt=""
            />
          </span>
        </button>
        {/*  <!--  End Dropdown trigger --> */}
        {/*  <!-- Start Menu list --> */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute top-full right-1/4 z-10 mt-1 flex w-52 list-none flex-col items-start justify-center rounded bg-white dark:bg-slate-900 backdrop-blur-lg py-5 px-3 shadow-md shadow-slate-500/10 `}>
          <ul className="py-3 text-gray-500 dark:text-slate-200 space-y-3">
            <li>User Profile</li>
            <li>Settings</li>
          </ul>
          <button
            disabled={false}
            className="mt-2 inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-lg focus-visible:outline-none whitespace-nowrap bg-sky-500 shadow-sky-200 dark:shadow-sky-800 hover:bg-sky-600 hover:shadow-md hover:shadow-sky-200 focus:bg-sky-700 focus:shadow-md focus:shadow-sky-200 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none">
            <span>Log Out</span>
          </button>
        </div>
      </div>
      {/* <!-- End Basic dropdown menu--> */}
    </>
  );
}
