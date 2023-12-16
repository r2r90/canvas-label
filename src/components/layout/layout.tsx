import type { ReactNode } from "react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { Navbar } from "@/components/layout/navbar";

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

      {/*Test Update Version  */}

      {/*  <div className="hidden h-full flex-col md:flex">
        <Navbar />
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="md:order-1">{children}</div>
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <Sidebar />
              </div>
            </div>
          </div>
        </Tabs>
      </div>*/}
    </div>
  );
};
