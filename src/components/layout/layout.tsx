import type { ReactNode } from "react";
import React from "react";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import Header from "@/components/layout/header/Header";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="h-full overflow-hidden rounded-[0.5rem] border bg-background  shadow">
      <Header />
      <Separator />

      <div className="container  py-6 ">
        <div className="grid h-full items-stretch gap-6 md:min-h-[600px] md:grid-cols-[1fr_350px] lg:min-h-[700px]   ">
          <div className="rounded-md border md:order-1">{children}</div>
          <div className="hidden flex-col space-y-4  sm:flex md:order-2">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

/*<div className="hidden h-full flex-col md:flex">
  <Header />
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

  <div className="flex h-full ">
    <Sidebar />
    <main className="h-full w-full bg-slate-300">{children}</main>
  </div>
</div>;*/
