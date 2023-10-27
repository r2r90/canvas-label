import React, { ComponentPropsWithoutRef, CSSProperties } from "react";
import { Html } from "react-konva-utils";

function getStyle(
  width: CSSProperties["width"],
  height: CSSProperties["height"],
) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    color: "black",
    fontSize: "24px",
    fontFamily: "sans-serif",
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    marginTop: "-4px",
  };
}

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
}: {
  x: number;
  y: number;
  width: CSSProperties["width"];
  height: CSSProperties["height"];
} & ComponentPropsWithoutRef<"textarea">) {
  const style = getStyle(width, height);
  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
      />
    </Html>
  );
}
