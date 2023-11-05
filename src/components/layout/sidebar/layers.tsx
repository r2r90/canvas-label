import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RxStack } from "react-icons/rx";

export const Layers = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-xl">
          <RxStack />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <Card className="p-2">
          <CardHeader>
            <CardTitle className="text-center">Layer</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex h-[2rem] flex-col items-center justify-between rounded-md border-2 border-muted bg-popover"></div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
