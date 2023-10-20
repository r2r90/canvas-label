import { UserNav } from "./user-nav";
import Image from "next/image";
import logo from "@/assets/logo.png"

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="relative h-12 w-12">
          <Image
            src={logo}
            alt="Logo"
            layout="fill" // required
            objectFit="cover" // change as you like
            className="rounded-full" // you can use other classes here too
          />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};
