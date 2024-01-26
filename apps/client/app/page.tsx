"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import barGraph from "../public/assets/images/barGraph.png";
import polarGraph from "../public/assets/images/polarGraph.png";
import AssessmentsTable from "./components/AssessmentsTable";

const HomePage = () => {
  return (
    <div className="w-screen h-[1050px] flex flex-col items-center justify-center bg-green-100 border-0 border-red-400">
      <div className="border-0 border-orange-400">
        <h1 className="text-4xl font-bold text-indigo-500 m-8">
          My Wheel of Life
        </h1>
      </div>

      <div className="flex border-0 border-yellow-400">
        <div className="flex flex-col items-center border-0 m-10 border-green-400 ">
          <Image src={polarGraph} width={500} height={500} alt="Polar Graph" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <Link href="/create-wheel-of-life">Create Assessment</Link>
          </button>
        </div>
        <div className="flex flex-col items-center border-0 m-10 border-green-400">
          <Image src={barGraph} width={500} height={500} alt="Bar Graph" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <Link href="/evolution">View Evolution</Link>
          </button>
        </div>
      </div>
      <div className="border-0 w-[450px]">
        <AssessmentsTable />
      </div>
    </div>
  );
};

export default HomePage;
