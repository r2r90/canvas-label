import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full ">
        <Sidebar />
        <main className="h-full w-full bg-slate-300">{children}</main>
      </div>
    </>
  );
};
