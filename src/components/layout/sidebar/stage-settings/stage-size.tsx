import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks";
import { updateStage } from "@/store/app.slice";

export const StageSize = () => {
  const dispatch = useAppDispatch();

  const handleStageSizeSelect = (
    width: number | undefined,
    height: number | undefined,
  ) => {
    dispatch(updateStage({ width, height }));
  };
  return (
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
  );
};
