import { useRef, type ElementRef, useEffect } from "react";
import { type TextConfig } from "konva/lib/shapes/Text";
import { Text, Transformer } from "react-konva";

type TransformableTextConfig = Omit<TextConfig, "text"> & {
  text?: TextConfig["text"];
  id: string;
};

export type TransformableTextProps = {
  textProps: TransformableTextConfig;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: TransformableTextConfig) => void;
};

const TransformableText = ({
  textProps,
  isSelected,
  onSelect,
  onChange,
}: TransformableTextProps) => {
  const textRef = useRef<ElementRef<typeof Text>>(null);
  const trRef = useRef<ElementRef<typeof Transformer>>(null);
  const text = textProps.text;

  useEffect(() => {
    if (!textRef.current) return;

    if (isSelected) {
      // we need to attach transformer manually
      trRef.current?.nodes([textRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={textRef}
        {...textProps}
        text={text}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...textProps,
            text,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        /* onTransformEnd={(e) => {
          const node = textRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...textProps,
            text,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}*/
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
export default TransformableText;
