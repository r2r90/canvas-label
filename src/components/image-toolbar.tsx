import React from "react";
import { TbFlipHorizontal, TbFlipVertical } from "react-icons/tb";
import { Toggle } from "@/components/ui/toggle";
import { useAppDispatch } from "@/hooks";
import { updateImage } from "@/store/app.slice";
import ImageOpacityTool from "@/components/image-editing-tools/image-opacity-tool";
import { Separator } from "@/components/ui/separator";

export function ImageToolbar({ selectedItemId, currentImage }) {
  const dispatch = useAppDispatch();
  const flipImageVerticaly = () => {
    const editOffsetY = currentImage.height / 2;
    const editScaleY = -1 * currentImage.scaleY;
    dispatch(
      updateImage({
        id: selectedItemId,
        offsetY: editOffsetY,
        scaleY: editScaleY,
      }),
    );
  };

  const flipImageHorizontaly = () => {
    const editOffsetX = currentImage.width / 2;
    const editScaleX = -1 * currentImage.scaleX;
    dispatch(
      updateImage({
        id: selectedItemId,
        offsetX: editOffsetX,
        scaleX: editScaleX,
      }),
    );
  };
  return (
    <>
      <Toggle onClick={() => flipImageHorizontaly()}>
        <TbFlipVertical />
      </Toggle>
      <Toggle>
        <TbFlipHorizontal onClick={() => flipImageVerticaly()} />
      </Toggle>
      <Separator orientation="vertical" />
      <ImageOpacityTool
        selectedItemId={selectedItemId}
        currentImage={currentImage}
      />
    </>
  );
}
