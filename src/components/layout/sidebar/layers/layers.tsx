import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectItem, setStageItems } from "@/store/app.slice";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import LayerItem from "@/components/layer-item";

export const Layers = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.app.currentStep);
  const items = useAppSelector(
    (state) => state.app.history[currentStep]?.items,
  );
  if (!items) return;
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over?.id);
    const result = arrayMove(items, oldIndex, newIndex);
    dispatch(setStageItems(result));
    dispatch(selectItem(active.id));
  };

  return (
    <Card className="p-2">
      <CardContent className="grid items-center gap-2 p-2 ">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <LayerItem item={item} key={item.id} />
            ))}
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
};
