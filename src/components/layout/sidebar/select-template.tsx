import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks";
import { LuLayoutTemplate } from "react-icons/lu";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SelectTemplate = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleSizeSelect = () => {
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="text-xl"
        >
          <LuLayoutTemplate />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="mt-4">
        <Card className="p-3">
          <CardHeader className="mb-2 p-2 text-center">
            <CardTitle>Template</CardTitle>
          </CardHeader>

          <ScrollArea>
            <div className="flex h-64 w-full flex-col items-center justify-between gap-4">
              <div className="rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                Image
              </div>
              <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                Image
              </div>{" "}
              <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                Image
              </div>{" "}
              <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                Image
              </div>{" "}
              <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                Image
              </div>{" "}
              <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                Image
              </div>{" "}
              <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                Image
              </div>{" "}
              <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                Image
              </div>
            </div>
          </ScrollArea>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
