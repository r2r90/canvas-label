import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RxLayout } from "react-icons/rx";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectBackground } from "@/store/app.slice";

export const BackgroundSelect = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const bgColor = useAppSelector((state) => state.app.backgroundColor);

  const handleBackgroundSelect = (color: string) => {
    dispatch(selectBackground(color));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="text-xl"
        >
          <RxLayout />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="mt-4">
        <Card className="p-3">
          <CardHeader className="mb-2 p-2 text-center">
            <CardTitle>Fond</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-2">
            <div>
              <Label
                htmlFor="apple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <input
                  className="m-2 "
                  type="color"
                  value={bgColor ?? undefined}
                  onChange={(e) => handleBackgroundSelect(e.target.value)}
                />
              </Label>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
