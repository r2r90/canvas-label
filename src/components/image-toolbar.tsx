import React from "react";
import { TbFlipHorizontal, TbFlipVertical } from "react-icons/tb";
import { Toggle } from "@/components/ui/toggle";
import { useAppDispatch } from "@/hooks";
import { type StageImageItem, updateImage } from "@/store/app.slice";
import ImageOpacityTool from "@/components/image-editing-tools/image-opacity-tool";
import { Separator } from "@/components/ui/separator";

type Props = {
  selectedItemId: string;
  currentImage: StageImageItem["params"];
};

export function ImageToolbar({ selectedItemId, currentImage }: Props) {
  const dispatch = useAppDispatch();
  const flipImageVerticaly = () => {
    const currentScale = currentImage.scaleY;
    let editOffsetY = currentImage.height;
    if (currentScale < 0) editOffsetY = 0;
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
    const currentScale = currentImage.scaleX;
    let editOffsetX = currentImage.width;
    if (currentScale < 0) editOffsetX = 0;
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
