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
          console.log(e);
          const positionX = e.target.x() + e.target.width() / 2;
          const positionY = e.target.y() + e.target.height() / 2;
          const canvasXCenter = (e.target.getStage()?.width() ?? 0) / 2;
          const canvasYCenter = (e.target.getStage()?.height() ?? 0) / 2;
          const isInTheXCenter =
            Math.abs(Math.round(canvasXCenter) - Math.round(positionX)) <= 5;
          const isInTheYCenter =
            Math.abs(Math.round(canvasYCenter) - Math.round(positionY)) <= 5;

          document.body.classList.toggle("show-vertical-line", isInTheXCenter);
          document.body.classList.toggle(
            "show-horizontal-line",
            isInTheYCenter,
          );
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
          const positionX = e.target.x() + e.target.width() / 2;
          const canvasXCenter = (e.target.getStage()?.width() ?? 0) / 2;
          const isInTheCenter =
            Math.abs(Math.round(canvasXCenter) - Math.round(positionX)) <= 5;
          onChange({
            ...imageProps,
            image,
            x: isInTheCenter
              ? canvasXCenter - e.target.width() / 2
              : e.target.x(),
            y: e.target.y(),
          });
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
