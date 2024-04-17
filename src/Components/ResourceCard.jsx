import React from "react";

export default function CardImage({ imgURL, name, description }) {
  return (
    <>
      {/*<!-- Component: Basic image card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        {/*  <!--  Image --> */}
        <figure>
          <img src={imgURL} alt="card image" className="aspect-video w-full" />
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="">
            <h3 className="text-xl font-medium text-slate-700">{name}</h3>
            <p className="text-sm text-slate-400"> {description}</p>
          </header>
        </div>
      </div>
      {/*<!-- End Basic image card --> */}
    </>
  );
}
