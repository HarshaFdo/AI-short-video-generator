import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-between p-2 px-2 shadow-md">
      <div className="flex items-center gap-x-1">
        <Image src={"/logo.svg"} alt="Logo" width={50} height={50} />
        <h2 className="text-xl font-bold">AI Short Video</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
