import type { TextConfig } from "konva/lib/shapes/Text";
import {
  type CSSProperties,
  type ElementRef,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Text, Transformer } from "react-konva";
import { EditableTextInput } from "@/components/editable-text-input";

type TransformableTextConfig = Omit<TextConfig, "text"> & {
  text?: string;
  fill?: string;
  direction?: string;
  fontFamily: string;
  fontSize?: number;
  fontStyle?: string;
  fontVariant?: string;
  textDecoration?: string;
  align?: CSSProperties["textAlign"];
  verticalAlign?: string;
  padding?: number;
  lineHeight?: number;
  letterSpacing?: number;
  wrap?: string;
  ellipsis?: boolean;
  x: number;
  y: number;
};

export type TransformableTextProps = {
  textProps: TransformableTextConfig;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: TransformableTextConfig) => void;
  id: string;
  isEditing?: boolean;
  onEditChange?: (isEditing: boolean) => void;
};

const TransformableText = ({
  textProps,
  isSelected,
  onSelect,
  onChange,
  id,
  isEditing,
  onEditChange,
}: TransformableTextProps) => {
  console.log(textProps);
  const [value, setText] = useState<string | undefined>("");
  const textRef = useRef<ElementRef<typeof Text>>(null);
  const trRef = useRef<ElementRef<typeof Transformer>>(null);
  const text = textProps.text;
  console.log(textRef.current);
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      onChange({
        ...textProps,
        text: value,
      });
      onEditChange?.(false);
    }
    if (e.key === "Escape") {
      setText("");
      onEditChange?.(false);
    }
  };

  const handleDblClick = () => {
    setText(text);
    onEditChange?.(true);
  };

  useEffect(() => {
    if (!textRef.current) return;

    if (isSelected) {
      // we need to attach transformer manually
      trRef.current?.nodes([textRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  if (isEditing) {
    return (
      <EditableTextInput
        fontSize={textProps.fontSize ?? 16}
        fontFamily={textProps.fontFamily}
        align={textProps.align}
        x={textProps.x}
        y={textProps.y}
        width={textProps.width}
        height={textProps.height}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        value={value}
      />
    );
  }
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
        onDblClick={handleDblClick}
        onTransformEnd={() => {
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
          id={id}
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
