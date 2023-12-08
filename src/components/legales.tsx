import React from "react";
import { Image, Layer } from "react-konva";
import women from "../assets/logo.png";
import useImage from "use-image";

export default function Legales() {
  const [test] = useImage(women);
  return (
    <Layer>
      <Image
        width={100}
        height={100}
        x={200}
        y={200}
        alt={women}
        image={test}
      />
    </Layer>
  );
}
