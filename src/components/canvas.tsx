import {
  TransformableImage,
  TransformableImageProps,
} from "@/components/transformable-image";

import type { KonvaEventObject } from "konva/lib/Node";
import { ChangeEvent, useState } from "react";
import { Layer, Stage } from "react-konva";

import { v1 } from "uuid";
import TransformableText, {
  TransformableTextProps,
} from "./transformable-text";

const Canvas = () => {
  const [selectedImageId, selectImage] = useState<string | null>(null);
  const [selectedTextId, selectText] = useState<string | null>(null);

  const [images, setImages] = useState<TransformableImageProps["imageProps"][]>(
    [],
  );

  const [texts, setTexts] = useState<TransformableTextProps["textProps"][]>([]);

  const checkDeselect = (e: KonvaEventObject<MouseEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectImage(null);
    }
  };

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageId = v1();
    const imageUrl = URL.createObjectURL(file);
    setImages((prev) => [...prev, { imageUrl, imageId }]);
  };

  const handleTextAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const textId = v1();

    setTexts((prev) => [...prev, { text, textId }]);
  };

  /*console.log(texts, " ++++ ", images);*/

  return (
    <main>
      <input type="file" onChange={handleImageUploaded} />
      <input
        type="text"
        onChange={handleTextAdd}
        placeholder="tape your text"
      />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {images.map((image) => {
            return (
              <TransformableImage
                onSelect={() => selectImage(image.imageId)}
                isSelected={image.imageId === selectedImageId}
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
                onSelect={() => selectText(text.textId)}
                isSelected={text.textId === selectedTextId}
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
