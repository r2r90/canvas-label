import type { TextConfig } from "konva/lib/shapes/Text";
import { useRef, type ElementRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

type TransformableTextConfig = Omit<TextConfig, "text"> & {
  text?: TextConfig["text"];
  id: string;
  direction?: string;
  fontFamily: string;
  fontSize?: number;
  fontStyle?: string;
  fontVariant?: string;
  textDecoration?: string;
  align?: string;
  verticalAlign?: string;
  padding?: number;
  lineHeight?: number;
  letterSpacing?: number;
  wrap?: string;
  ellipsis?: boolean;
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
        onTransform={() => {
          if (textRef.current !== null) {
            const textNode = textRef.current;
            const newWidth = textNode.width() * textNode.scaleX();
            textNode.setAttrs({
              width: newWidth,
              scaleX: 1,
              scaleY: 1,
            });
          }
        }}
        onTap={onSelect}
        ref={textRef}
        align={"center"}
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
        onTransformEnd={(e) => {
          const node = textRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          // node.scaleX(1);
          // node.scaleY(1);
          onChange({
            ...textProps,
            text,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            return { ...newBox, height: oldBox.height };
          }}
        />
      )}
    </>
  );
};
export default TransformableText;
