import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RxStack } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { OrderDirection, updateItemOrder } from "@/store/app.slice";

export const Layers = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.app.items);

  const updateImageLayer = (id: string, direction: OrderDirection) => {
    dispatch(
      updateItemOrder({
        id,
        direction,
      }),
    );
  };

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
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2 ">
                {item.id}
                <Button
                  className="h-full"
                  onClick={() => updateImageLayer(item.id, OrderDirection.Up)}
                >
                  +
                </Button>
                <Button
                  className="h-full"
                  onClick={() => updateImageLayer(item.id, OrderDirection.Down)}
                >
                  -
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
