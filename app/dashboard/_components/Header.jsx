import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const [userDetail, setUserDetail] = useContext(UserDetailContext);
  return (
    <div className="flex items-center justify-between p-2 px-2 shadow-md">
      <div className="flex items-center gap-x-1">
        <Image src={"/logo.svg"} alt="Logo" width={50} height={50} />
        <h2 className="text-xl font-bold">AI Short Video</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Image src={"/star.png"} />
          <h2>{userDetail?.credits}</h2>
        </div>
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
