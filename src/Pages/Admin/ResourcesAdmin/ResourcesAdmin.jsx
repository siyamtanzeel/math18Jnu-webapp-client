import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdminTitle from "../../../Components/AdminTitle";
import LinksAdmin from "./LinksAdmin";
import VideosAdmin from "./VideosAdmin";
import DocsAdmin from "./DocsAdmin";
import { FaFileAlt, FaLink, FaYoutube } from "react-icons/fa";

const ResourcesAdmin = () => {
  const [tabIdx, setTabIdx] = useState(1);
  return (
    <div className="w-full ">
      <Helmet>
        <title>Resources - Admin</title>
      </Helmet>
      <div className="flex flex-col items-center space-y-7 justify-start py-5 min-h-screen">
        <Helmet>
          <title>Resources - Eccentric-18</title>
        </Helmet>
        <AdminTitle>Resources</AdminTitle>
        <div role="tablist" className="tabs tabs-boxed max-w-72 mx-auto mt-12">
          <a
            role="tab"
            className={`tab ${
              tabIdx == 1 &&
              "bg-neutral text-white transition-colors duration-300"
            }`}
            onClick={() => setTabIdx(1)}>
            <FaYoutube className="mr-1"></FaYoutube>Videos
          </a>
          <a
            role="tab"
            className={`tab ${
              tabIdx == 2 &&
              "bg-neutral text-white transition-colors duration-300"
            }`}
            onClick={() => setTabIdx(2)}>
            <FaLink className="mr-1"></FaLink>Links
          </a>
          <a
            role="tab"
            className={`tab ${
              tabIdx == 3 &&
              "bg-neutral text-white transition-colors duration-300"
            }`}
            onClick={() => setTabIdx(3)}>
            <FaFileAlt className="mr-1"></FaFileAlt>Docs
          </a>
        </div>

        <div className="">
          {tabIdx == 2 && <LinksAdmin></LinksAdmin>}
          {tabIdx == 1 && <VideosAdmin></VideosAdmin>}
          {tabIdx == 3 && <DocsAdmin></DocsAdmin>}
        </div>
      </div>
    </div>
  );
};

export default ResourcesAdmin;
