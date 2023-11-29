import React, { type CSSProperties } from "react";
import { Html } from "react-konva-utils";

type Props = {
  x: number;
  fontSize: number;
  fontFamily: string;
  align: CSSProperties["textAlign"];
  y: number;
  width: number;
  height: number;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value = "",
  onChange,
  onKeyDown,
  fontSize,
  fontFamily,
  align,
}: Props) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${height + 5}px`;
      textAreaRef.current.style.height = "auto";
      // after browsers resized it we can set actual value
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 3 + "px";
      textAreaRef.current.focus();
    }
  }, [height]);
  const style: CSSProperties = {
    textAlign: align,
    width: `${width}px`,
    height: `${height + 5}px`,
    border: "none",
    padding: 0,
    margin: "-2px 0 0",
    background: "none",
    outline: "none",
    resize: "none",
    color: "black",
    lineHeight: 1,
    overflow: "hidden",
    fontSize,
    fontFamily,
  };

  return (
    <Html
      groupProps={{ x, y }}
      divProps={{ style: { opacity: 1, display: "flex" } }}
    >
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
        ref={textAreaRef}
      />
    </Html>
  );
}
