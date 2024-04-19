import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer footer-center p-4 bg-slate-900 text-base-100"
      data-theme="dark">
      <aside>
        <p className="text-white">
          Copyright © 2024 - All rights reserved by <br className="md:hidden" />
          <a
            href="https://www.facebook.com/siyamtanzeel"
            className="text-primary font-bold text-lg">
            Muhammad Tanzeel
          </a>{" "}
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
