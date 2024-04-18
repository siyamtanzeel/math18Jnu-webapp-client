import { useState } from "react";
import Title from "../../Components/Title";

import { Helmet } from "react-helmet-async";
import Links from "./Links";
import Videos from "./Videos";

const Resources = () => {
  const [tabIdx, setTabIdx] = useState(1);
  return (
    <div className="flex flex-col items-center space-y-7 justify-center py-5">
      <Helmet>
        <title>Resources - Eccentric-18</title>
      </Helmet>
      <Title>Resources</Title>
      <div role="tablist" className="tabs tabs-boxed max-w-60 mx-auto mt-12">
        <a
          role="tab"
          className={`tab ${tabIdx == 1 && "tab-active"}`}
          onClick={() => setTabIdx(1)}>
          Videos
        </a>
        <a
          role="tab"
          className={`tab ${tabIdx == 2 && "tab-active"}`}
          onClick={() => setTabIdx(2)}>
          Links
        </a>
        <a
          role="tab"
          className={`tab ${tabIdx == 3 && "tab-active"}`}
          onClick={() => setTabIdx(3)}>
          Docs
        </a>
      </div>

      <div className="">
        {tabIdx == 2 && <Links></Links>}
        {tabIdx == 1 && <Videos></Videos>}
      </div>
    </div>
  );
};

export default Resources;
