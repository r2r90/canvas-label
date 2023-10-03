import {
  TransformableImage,
  TransformableImageProps,
} from "@/components/transformable-image";

import type { KonvaEventObject } from "konva/lib/Node";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { Layer, Stage } from "react-konva";

import { v1 } from "uuid";
import TransformableText, {
  TransformableTextProps,
} from "./transformable-text";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { appSlice, checkDeselect } from "@/store/app.slice";
import { Toolbar } from "./toolbar";

// Provider *

const Canvas = () => {
  const dispatch = useAppDispatch();

  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const selectItem = (id: string) => dispatch(appSlice.actions.selectItem(id));
  const texts = useAppSelector((state) => state.app.texts);
  const images = useAppSelector((state) => state.app.images);

  const deselectHandler = (e) => {
    dispatch(checkDeselect(e));
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between">
      <Toolbar />
      <Stage
        className="bg-white"
        width={600}
        height={500}
        onTouchStart={deselectHandler}
        onMouseDown={deselectHandler}
      >
        <Layer>
          {images.map((image) => {
            return (
              <TransformableImage
                onSelect={() => selectItem(image.id)}
                isSelected={image.id === selectedItemId}
                onChange={(newAttrs) => {
                  images.map((i) => (i.id === image.id ? newAttrs : i));
                }}
                imageProps={image}
                key={image.id}
              />
            );
          })}
          {texts.map((text) => {
            return (
              <TransformableText
                onSelect={() => selectItem(text.id)}
                isSelected={text.id === selectedItemId}
                onChange={(newAttrs) => {
                  texts.map((t) => (t.id === text.id ? newAttrs : t));
                }}
                textProps={text}
                key={text.id}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
