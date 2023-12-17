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
  const currentStep = useAppSelector((state) => state.app.currentStep);

  const stage = useAppSelector(
    (state) => state.app.history[currentStep]?.stage,
  );
  if (!stage) return null;
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
