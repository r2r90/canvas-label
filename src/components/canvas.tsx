import { TransformableImage } from "@/components/transformable-image";
import type { KonvaEventObject } from "konva/lib/Node";
import { Layer, Rect, Stage } from "react-konva";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  appSlice,
  deselectItem,
  StageItemType,
  updateImage,
  updateText,
} from "@/store/app.slice";
import { useEffect, useState } from "react";
import { Toolbar } from "@/components/toolbar";
import TransformableText from "@/components/transformable-text";
import LayerBorder from "@/components/layer-border";
import { CANVAS_PADDING_X, CANVAS_PADDING_Y } from "@/consts/canvas-params";

const Canvas = () => {
  const dispatch = useAppDispatch();
  const stage = useAppSelector((state) => state.app.stage);
  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const selectItem = (id: string) => dispatch(appSlice.actions.selectItem(id));
  const items = useAppSelector((state) => state.app.items);

  const backgroundRect = useAppSelector((state) => state.app.background);
  const backgroundId = "background";
  const deselectHandler = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>,
  ) => {
    const target = e.target;
    const clickedOnEmpty =
      target === target.getStage() ||
      (typeof target === "object" && target.attrs.id === backgroundId);

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

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <Toolbar />
      <div
        className={"flex h-full w-full items-center justify-center"}
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          dispatch(deselectItem());
        }}
      >
        <Stage
          className="bg-white"
          width={stage.width}
          height={stage.height}
          onTouchStart={deselectHandler}
          onMouseDown={deselectHandler}
          x={stage.x}
          y={stage.y}
          scaleX={stage.scale}
          scaleY={stage.scale}
        >
          <Layer>
            {!!backgroundRect && (
              <Rect
                width={stage.width}
                height={stage.height}
                fill={backgroundRect.fill}
                onTouchStart={deselectHandler}
                onClick={deselectHandler}
                id={backgroundId}
              />
            )}
          </Layer>
          <Layer
            clipX={CANVAS_PADDING_X}
            clipY={CANVAS_PADDING_Y}
            clipWidth={stage.width - 2 * CANVAS_PADDING_X}
            clipHeight={stage.height - 2 * CANVAS_PADDING_Y}
          >
            {items.toReversed().map((item) => {
              if (item.type === StageItemType.Image) {
                return (
                  <TransformableImage
                    id={item.id}
                    onSelect={() => selectItem(item.id)}
                    isSelected={item.id === selectedItemId}
                    onChange={(newAttrs) => {
                      dispatch(updateImage({ id: item.id, ...newAttrs }));
                    }}
                    imageProps={item.params}
                    key={item.id}
                  />
                );
              }
              if (item.type === StageItemType.Text) {
                return (
                  <TransformableText
                    isEditing={isEditing}
                    onEditChange={toggleEdit}
                    onSelect={() => selectItem(item.id)}
                    isSelected={item.id === selectedItemId}
                    onChange={(newAttrs) => {
                      dispatch(updateText({ id: item.id, ...newAttrs }));
                    }}
                    textProps={item.params}
                    key={item.id}
                    id={item.id}
                  />
                );
              }
            })}
          </Layer>
          {/*<Legales />*/}

          <LayerBorder />
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;
