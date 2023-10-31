import React from "react";
import { DeleteShapeButton } from "@/components/delete-shape-button";
import { Button } from "@/components/ui/button";
import { TbFlipHorizontal, TbFlipVertical } from "react-icons/tb";
import { Toggle } from "@/components/ui/toggle";
import { useAppDispatch } from "@/hooks";
import { updateImage } from "@/store/app.slice";

export function ImageToolbar({ selectedItemId, currentImage }) {
  const dispatch = useAppDispatch();
  const flipImageVerticaly = (selectedItemId) => {
    dispatch(
      updateImage({
        id: selectedItemId,
      }),
    );
  };

  const flipImageHorizontaly = () => {
    console.log("Horizontal Flip");
  };
  return (
    <>
      <Toggle onClick={flipImageVerticaly}>
        <TbFlipVertical />
      </Toggle>
      <Toggle>
        <TbFlipHorizontal onClick={flipImageHorizontaly} />
      </Toggle>
    </>
  );
}
