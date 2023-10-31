import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PiTextT } from "react-icons/pi";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { addText } from "@/store/app.slice";
import { SlSizeFullscreen } from "react-icons/sl";

const SizeSelect = () => {
  const [open, setOpen] = useState(false);

  const handleSizeSelect = () => {
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className="text-xl"
        >
          <SlSizeFullscreen />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="mt-4">
        <Card className="p-3">
          <CardHeader>
            <CardTitle>Sélectionnez la taille d'étiquette</CardTitle>
          </CardHeader>

          <div className="flex flex-col gap-2">
            <Button>Petit Format</Button>
            <Button>Moyen Format</Button>
            <Button>Grand Format</Button>
          </div>

          <CardFooter className="mt-8 justify-between">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSizeSelect}>Submit</Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
export default SizeSelect;
