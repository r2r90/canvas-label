import React, { type ChangeEvent } from "react";
import { ImageToolbar } from "@/components/image-toolbar";
import { TextToolbar } from "@/components/text-toolbar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateText } from "@/store/app.slice";
import { DeleteShapeButton } from "@/components/delete-shape-button";
import { Separator } from "@/components/ui/separator";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const texts = useAppSelector((state) => state.app.texts);
  const images = useAppSelector((state) => state.app.images);

  const currentText = texts.find((t) => t.id === selectedItemId);
  const currentImage = images.find((img) => img.id === selectedItemId);

  if (!selectedItemId) return null;

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
    <div className=" flex h-[5rem] w-full gap-6 border border-t-0 bg-white p-[1rem]">
      {currentText && (
        <TextToolbar
          currentText={currentText}
          selectedItemId={selectedItemId}
          onTextColorChange={handleTextColorChange}
        />
      )}
      {currentImage && (
        <ImageToolbar
          currentImage={currentImage}
          selectedItemId={selectedItemId}
        />
      )}

      <Separator orientation="vertical" />

      <DeleteShapeButton selectedItemId={selectedItemId} />
    </div>
  );
};
