import { ReactNode } from "react";
import { Sidebar } from "./sidebar";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-full ">
      <Sidebar {} />
      <main>{children}</main>
    </div>
  );
};
