import React from "react";
import { Tabs } from "@/components/ui/tabs";
import Sidebar from "@/components/Test/content/edit-utils/sidebar";
import StageArea from "@/components/Test/content/playground-area/stage-area";

export default function Playground() {
  return (
    <Tabs defaultValue="complete" className="flex-1">
      <div className="container h-full py-6">
        <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
          <div className="md:order-1">
            <StageArea />
          </div>
          <div className="hidden flex-col space-y-4 sm:flex md:order-2">
            <Sidebar />
          </div>
        </div>
      </div>
    </Tabs>
  );
}
