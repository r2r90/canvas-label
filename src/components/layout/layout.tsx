import type { ReactNode } from "react";
import { Sidebar } from "./sidebar/sidebar";
import { Navbar } from "./navbar";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="h-full overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <Navbar />
      <div className="flex h-full ">
        <Sidebar />
        <main className="h-full w-full bg-slate-300">{children}</main>
      </div>
    </div>
  );
};
