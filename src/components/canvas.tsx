import { TransformableImage } from "@/components/transformable-image";
import type { KonvaEventObject } from "konva/lib/Node";
import { Layer, Rect, Stage } from "react-konva";
import TransformableText from "./transformable-text";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { appSlice, deselectItem } from "@/store/app.slice";
import { useEffect, useState } from "react";
import { Toolbar } from "@/components/toolbar";

const Canvas = () => {
  const dispatch = useAppDispatch();
  const stage = useAppSelector((state) => state.app.stage);
  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const selectItem = (id: string) => dispatch(appSlice.actions.selectItem(id));
  const texts = useAppSelector((state) => state.app.texts);
  const images = useAppSelector((state) => state.app.images);
  const backgroundRects = useAppSelector((state) => state.app.backgroundRects);

  const deselectHandler = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>,
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (!clickedOnEmpty) {
      return;
    }
    dispatch(deselectItem());
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
  }, [selected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    setSelected(!isEditing);
  }

  function toggleTransforming() {
    setIsTransforming(!isTransforming);
    setSelected(!isTransforming);
  }

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Toolbar />

      <Stage
        className="m-[3rem] bg-white"
        width={stage.width}
        height={stage.height}
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

          {backgroundRects.map((rect, i) => {
            return (
              <Rect
                key={i}
                width={rect.width}
                height={rect.width}
                fill={rect.fill}
              />
            );
          })}
        </Layer>
        {/*  <Layer>
          <Text zIndex={10} x={30} y={200} fontSize={48} text="Hello" />
        </Layer>*/}
      </Stage>
    </div>
  );
};

export default Canvas;
