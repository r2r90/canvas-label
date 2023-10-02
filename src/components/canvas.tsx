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
import { appSlice } from "@/store/app.slice";

// Provider * 

const Canvas = () => {

  const dispatch = useAppDispatch()

  const selectedItemId = useAppSelector((state) => state.app.selectedItemId)
  
  const selectItem = (id: string) => dispatch(appSlice.actions.selectItem(id))

  const [selectedImageId, selectImage] = useState<string | null>(null);
  const [selectedTextId, selectText] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");

  const [images, setImages] = useState<TransformableImageProps["imageProps"][]>(
    [],
  );

  const [texts, setTexts] = useState<TransformableTextProps["textProps"][]>([]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  


  return (
    <main className="flex">
     
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {images.map((image) => {
            return (
              <TransformableImage
                onSelect={() => selectItem(image.imageId)}
                isSelected={image.imageId === selectedItemId}
                onChange={(newAttrs) => {
                  setImages(
                    images.map((i) =>
                      i.imageId === image.imageId ? newAttrs : i,
                    ),
                  );
                }}
                imageProps={image}
                key={image.imageId}
              />
            );
          })}
          {texts.map((text) => {
            return (
              <TransformableText
                onSelect={() => selectItem(text.textId)}
                isSelected={text.textId === selectedItemId}
                onChange={(newAttrs) => {
                  setTexts(
                    texts.map((t) => (t.textId === text.textId ? newAttrs : t)),
                  );
                }}
                textProps={text}
                key={text.textId}
              />
            );
          })}
        </Layer>
      </Stage>
    </main>
  );
};

export default Canvas;
