import React, { ChangeEvent } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PiFrameCornersDuotone, PiImageDuotone } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function SelectTemplate() {
  const dispatch = useAppDispatch();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="text-xl">
          <PiFrameCornersDuotone />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        {/*<Input type="file" onChange={handleImageUploaded} />*/}

        <Card className="p-2">
          <CardHeader>
            <CardTitle className="text-center">Choisissez un cadre</CardTitle>
          </CardHeader>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
