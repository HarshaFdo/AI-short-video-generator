import React from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";

function Dashboardlayout({ children }) {
  return (
    <div>
      <div className="fixed mt-[65px] w-64 hidden h-screen bg-white md:block">
        <SideNav />
      </div>
      <div>
        <Header />
        <div className="p-10 md:ml-64">{children}</div>
      </div>
    </div>
  );
}

export default Dashboardlayout;
