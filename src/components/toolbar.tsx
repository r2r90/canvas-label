import React, { type ChangeEvent } from "react";
import { ImageToolbar } from "@/components/image-toolbar";
import { TextToolbar } from "@/components/text-toolbar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { StageItemType, updateText } from "@/store/app.slice";
import { DeleteShapeButton } from "@/components/delete-shape-button";
import { Separator } from "@/components/ui/separator";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.app.currentStep);

  const selectedItemId = useAppSelector(
    (state) => state.app.history[currentStep]?.selectedItemId,
  );
  const items = useAppSelector(
    (state) => state.app.history[currentStep]?.items,
  );

  const currentItem = items?.find((t) => t.id === selectedItemId);

  if (!currentItem || !selectedItemId) return null;

  const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        fill: e.target.value,
      }),
    );
  };

  return (
    <div className="inset absolute flex h-[5rem] w-full gap-6 border border-t-0 bg-white p-[1rem]">
      {currentItem.type === StageItemType.Text && (
        <TextToolbar
          currentText={currentItem.params}
          selectedItemId={selectedItemId}
          onTextColorChange={handleTextColorChange}
        />
      )}
      {currentItem.type === StageItemType.Image && (
        <ImageToolbar
          currentImage={currentItem.params}
          selectedItemId={selectedItemId}
        />
      )}

      <Separator orientation="vertical" />

      <DeleteShapeButton selectedItemId={selectedItemId} />
    </div>
  );
};
