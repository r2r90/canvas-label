import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import Canvas from "@/components/canvas";

export default function StageArea() {
  return (
    <TabsContent value="complete" className="mt-0 border-0 p-0">
      <div className="flex h-full flex-col space-y-4">
        <div className="min-h-[400px] flex-1 rounded-md border border-input bg-background p-4 2xl:min-h-[750px]">
          <Canvas />
        </div>

        <div className="flex items-center space-x-2">
          <Button>Submit</Button>
          <Button variant="secondary">
            <span className="sr-only">Show history</span>
            <CounterClockwiseClockIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}
