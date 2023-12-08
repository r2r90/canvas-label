import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RxMove } from "react-icons/rx";
import { useAppDispatch } from "@/hooks";
import { updateStage } from "@/store/app.slice";

const SizeSelect = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleStageSizeSelect = (
    width: number | undefined,
    height: number | undefined,
  ) => {
    dispatch(updateStage({ width, height }));
  };

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
          <RxMove />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="mt-4">
        <Card className="p-3">
          <CardHeader>
            <CardTitle>{`Sélectionnez la taille d'étiquette`}</CardTitle>
          </CardHeader>

          <div className="flex flex-col gap-2">
            <Button onClick={() => handleStageSizeSelect(269.32, 165.87)}>
              Petit Format
            </Button>
            <Button onClick={() => handleStageSizeSelect(323.15, 227)}>
              Moyen Format
            </Button>
            <Button onClick={() => handleStageSizeSelect(410, 289)}>
              Grand Format
            </Button>
          </div>

          {/*<CardFooter className="mt-8 justify-between">*/}
          {/*  <Button variant="ghost" onClick={() => setOpen(false)}>*/}
          {/*    Cancel*/}
          {/*  </Button>*/}
          {/*  <Button onClick={handleSizeSelect}>Submit</Button>*/}
          {/*</CardFooter>*/}
        </Card>
      </PopoverContent>
    </Popover>
  );
};
export default SizeSelect;
