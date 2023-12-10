import React from "react";
import { Layer, Text } from "react-konva";

export default function Legacy({ stageParams }) {
  return (
    <Layer>
      <Text
        x={stageParams.width / 2 - 70}
        y={50}
        text="CHAMPAGNE"
        fontSize={24}
      />
      <Text x={35} y={stageParams.height - 50} text="12% Vol." fontSize={14} />
      <Text
        x={stageParams.width / 2 - 10}
        y={stageParams.height - 70}
        text="BRUT"
        fontSize={18}
      />
      <Text
        x={stageParams.width - 75}
        y={stageParams.height - 50}
        text="750ml"
        fontSize={14}
      />
      {/*<Image image={} x={stageParams.width - 75} y={stageParams.height - 50} />*/}
    </Layer>
  );
}
