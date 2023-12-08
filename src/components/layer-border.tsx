import React from "react";
import { Layer, Line } from "react-konva";
import {
  CANVAS_PADDING_X,
  CANVAS_PADDING_Y,
  DASH_SPACING,
  DASH_STROKE_COLOR,
  DASH_STROKE_WIDTH,
  DASH_WIDTH,
} from "@/consts/canvas-params";
import { useAppSelector } from "@/hooks";

export default function LayerBorder() {
  const stage = useAppSelector((state) => state.app.stage);
  return (
    <Layer>
      <Line
        points={[
          CANVAS_PADDING_X,
          CANVAS_PADDING_Y,
          stage.width - CANVAS_PADDING_X,
          CANVAS_PADDING_Y,
        ]}
        stroke={DASH_STROKE_COLOR}
        strokeWidth={DASH_STROKE_WIDTH}
        dash={[DASH_WIDTH, DASH_SPACING]}
      />
      <Line
        points={[
          CANVAS_PADDING_X,
          CANVAS_PADDING_Y,
          CANVAS_PADDING_X,
          stage.height - CANVAS_PADDING_Y,
        ]}
        stroke={DASH_STROKE_COLOR}
        strokeWidth={DASH_STROKE_WIDTH}
        dash={[DASH_WIDTH, DASH_SPACING]}
      />
      <Line
        points={[
          CANVAS_PADDING_X,
          stage.height - CANVAS_PADDING_Y,
          stage.width - CANVAS_PADDING_X,
          stage.height - CANVAS_PADDING_Y,
        ]}
        stroke={DASH_STROKE_COLOR}
        strokeWidth={DASH_STROKE_WIDTH}
        dash={[DASH_WIDTH, DASH_SPACING]}
      />
      <Line
        points={[
          stage.width - CANVAS_PADDING_X,
          CANVAS_PADDING_Y,
          stage.width - CANVAS_PADDING_X,
          stage.height - CANVAS_PADDING_Y,
        ]}
        stroke={DASH_STROKE_COLOR}
        strokeWidth={DASH_STROKE_WIDTH}
        dash={[DASH_WIDTH, DASH_SPACING]}
      />
    </Layer>
  );
}
