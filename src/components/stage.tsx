import { type ComponentPropsWithoutRef } from "react";
import { Stage as StageKonva } from "react-konva";

const Stage = ({
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof StageKonva>) => {
  return (
    <StageKonva width={window.innerWidth} height={window.innerHeight} {...rest}>
      {children}
    </StageKonva>
  );
};
export default Stage;
