import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectBackground } from "@/store/app.slice";

export const StageBackground = () => {
  const dispatch = useAppDispatch();
  const bgColor = useAppSelector((state) => state.app.backgroundColor);

  const handleBackgroundSelect = (color: string) => {
    dispatch(selectBackground(color));
  };
  return (
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
  );
};
