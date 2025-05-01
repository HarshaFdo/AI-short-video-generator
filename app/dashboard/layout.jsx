"use client";

import React, { useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext";

function Dashboardlayout({ children }) {
  const [videoData, setVideoData] = useState([]);
  return (
    <VideoDataContext.Provider value={{ videoData, setVideoData }}>
      <div>
        <div className="fixed mt-[65px] w-64 hidden h-screen bg-white md:block">
          <SideNav />
        </div>
        <div>
          <Header />
          <div className="p-10 md:ml-64">{children}</div>
        </div>
      </div>
    </VideoDataContext.Provider>
  );
}

export default Dashboardlayout;
