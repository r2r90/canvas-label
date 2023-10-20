import { TransformableImage } from "@/components/transformable-image";

import type { KonvaEventObject } from "konva/lib/Node";

import { Layer, Stage } from "react-konva";
import TransformableText from "./transformable-text";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { appSlice, deselectItem } from "@/store/app.slice";
import { Toolbar } from "./toolbar";

const Canvas = () => {
  const dispatch = useAppDispatch();

  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const selectItem = (id: string) => dispatch(appSlice.actions.selectItem(id));
  const texts = useAppSelector((state) => state.app.texts);
  const images = useAppSelector((state) => state.app.images);

  const deselectHandler = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>,
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (!clickedOnEmpty) {
      return;
    }
    dispatch(deselectItem());
  };

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Toolbar />
      <Stage
        className="m-[3rem] bg-white"
        width={600}
        height={500}
        onTouchStart={deselectHandler}
        onMouseDown={deselectHandler}
      >
        <Layer>
          {images.map((image) => {
            return (
              <TransformableImage
                onSelect={() => selectItem(image.id)}
                isSelected={image.id === selectedItemId}
                onChange={(newAttrs) => {
                  images.map((i) => (i.id === image.id ? newAttrs : i));
                }}
                imageProps={image}
                key={image.id}
              />
            );
          })}
          {texts.map((text) => {
            return (
              <TransformableText
                onSelect={() => selectItem(text.id)}
                isSelected={text.id === selectedItemId}
                onChange={(newAttrs) => {
                  texts.map((t) => (t.id === text.id ? newAttrs : t));
                }}
                textProps={text}
                key={text.id}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
