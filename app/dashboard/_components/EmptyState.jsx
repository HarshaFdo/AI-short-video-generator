import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function EmptyState() {
  return (
    <div className="flex flex-col items-center p-5 py-24 mt-10 border-2 border-dashed">
      <h2>You don't have any short video created</h2>
      <Link href={"/dashboard/create-new"}>
        <Button>Create New Short Video</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
