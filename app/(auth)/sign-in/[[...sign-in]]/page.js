import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Image
          src={"/login.jpg"}
          alt="login"
          width={500}
          height={500}
          className="object-contain w-full"
        />
      </div>
      <div className="flex items-center justify-center h-screen">
        <SignIn />
      </div>
    </div>
  );
}
