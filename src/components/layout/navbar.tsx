import { UserNav } from "./user-nav";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useAppDispatch } from "@/hooks";
import { goBack, goForward } from "@/store/app.slice";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const handleGoBack = () => {
    dispatch(goBack());
  };
  const handleGoForward = () => {
    dispatch(goForward());
  };
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <button onClick={handleGoBack}>Back</button>
        <button onClick={handleGoForward}>Forward</button>
        <div className="relative h-12 w-12">
          <Image
            src={logo}
            alt="Logo"
            layout="fill" // required
            objectFit="cover" // change as you like
            className="rounded-full object-cover" // you can use other classes here too
          />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};
