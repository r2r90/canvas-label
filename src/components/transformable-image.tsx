import { type ImageConfig } from "konva/lib/shapes/Image";
import { type ElementRef, useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

type TransformableImageConfig = Omit<ImageConfig, "image"> & {
  imageUrl: string;
};

export type TransformableImageProps = {
  imageProps: TransformableImageConfig;
  id: string;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: TransformableImageConfig) => void;
  isBlocked: boolean;
};

export const TransformableImage = ({
  imageProps,
  id,
  isSelected,
  onSelect,
  onChange,
  isBlocked,
}: TransformableImageProps) => {
  const imageRef = useRef<ElementRef<typeof Image>>(null);
  const trRef = useRef<ElementRef<typeof Transformer>>(null);
  const [image] = useImage(imageProps.imageUrl);

  useEffect(() => {
    if (!imageRef.current) return;

    if (isSelected) {
      // we need to attach transformer manually
      trRef.current?.nodes([imageRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  return (
    <>
      <Image
        onDragMove={(e) => {
          if (isBlocked) {
            return;
          }

          imageProps.onDragMove(e);
        }}
        id={id}
        alt={"canvas image"}
        onClick={onSelect}
        onTap={onSelect}
        ref={imageRef}
        {...imageProps}
        image={image}
        draggable={!isBlocked}
        onDragEnd={(e) => {
          if (isBlocked) {
            return;
          }
          imageProps.onDragEnd?.(e);
        }}
        onTransformEnd={() => {
          const node = imageRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...imageProps,
            image,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        x={imageProps.x}
        y={imageProps.y}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
