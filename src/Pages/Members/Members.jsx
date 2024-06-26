import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import useStudents from "../../hooks/useStudents";
import { QueryCache, useQuery } from "@tanstack/react-query";

import Title from "../../Components/Title";
import { Helmet } from "react-helmet-async";

const Members = () => {
  // const [students, setStudents] = useState([]);
  // useEffect(() => {
  //   fetch("https://math18jnu-webapp-server.vercel.app/students")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStudents(data);
  //       console.log(data);
  //     });
  // }, []);
  const { data, isLoading } = useStudents();
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(6);
  const [pageIdx, setPageIdx] = useState(1);

  return (
    <div className=" h-full px-2 flex flex-col items-center justify-center py-5 space-y-5 rounded-t-lg">
      <Helmet>
        <title>Members - Eccentric-18</title>
      </Helmet>
      <Title>Meet Our Members</Title>
      {/* {isLoading && (
        <div className="h-[500px] w-full flex items-center justify-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )} */}
      <div className="text-base-content font-semibold text-xl ">
        <div className="join bg-base-100 shadow-xl">
          <button
            className="join-item btn text-2xl"
            disabled={!isLoading && startIdx - 6 < 0 && true}
            onClick={() => {
              setPageIdx(pageIdx - 1);
              setStartIdx(startIdx - 6);
              setEndIdx(endIdx - 6);
            }}>
            «
          </button>
          <button className="join-item btn">Page {pageIdx}</button>
          <button
            className="join-item btn text-2xl"
            disabled={!isLoading && startIdx + 6 > data.length - 1 && true}
            onClick={() => {
              setPageIdx(pageIdx + 1);
              setStartIdx(startIdx + 6);
              setEndIdx(endIdx + 6);
            }}>
            »
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-start justify-center">
        {isLoading &&
          [1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              className="flex flex-col gap-4 w-72 md:w-80 min-h-[500px]"
              key={idx}>
              <div className="skeleton h-52 w-full"></div>
              <div className="skeleton h-10 w-28"></div>
              <div className="skeleton h-10 w-full"></div>
              <div className="skeleton h-10 w-full"></div>
            </div>
          ))}
        {data
          ?.sort((a, b) => {
            // Extracting student IDs from each object
            const idA = a.std_id;
            const idB = b.std_id;

            // Comparing student IDs and returning the comparison result
            if (idA < idB) {
              return -1; // ID A comes before ID B
            }
            if (idA > idB) {
              return 1; // ID B comes before ID A
            }
            return 0; // IDs are equal
          })
          .slice(startIdx, endIdx)
          .map((student) => {
            return (
              <MemberCard key={student.std_id} student={student}></MemberCard>
            );
          })}
      </div>
    </div>
  );
};

export default Members;
