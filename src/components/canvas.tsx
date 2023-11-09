import { TransformableImage } from "@/components/transformable-image";
import type { KonvaEventObject } from "konva/lib/Node";
import { Layer, Rect, Stage } from "react-konva";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  appSlice,
  deselectItem,
  setStageScale,
  StageItemType,
  updateImage,
  updateText,
} from "@/store/app.slice";
import { useEffect, useState, type MouseEvent } from "react";
import { Toolbar } from "@/components/toolbar";
import type Konva from "konva";
import TransformableText from "@/components/transformable-text";

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
    console.log(target);
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

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const targetStage = e.target.getStage()!;
    const oldScale = targetStage.scaleX();

    const mousePointTo = {
      x:
        targetStage.getPointerPosition().x / oldScale -
        targetStage.x() / oldScale,
      y:
        targetStage.getPointerPosition().y / oldScale -
        targetStage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    dispatch(
      setStageScale({
        scale: newScale,
        x:
          (targetStage.getPointerPosition().x / newScale - mousePointTo.x) *
          newScale,
        y:
          (targetStage.getPointerPosition().y / newScale - mousePointTo.y) *
          newScale,
      }),
    );
  };

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
          // onWheel={handleWheel}
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
            {items.map((item) => {
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
          {/* <Layer>
          <Rect
            x={50}
            y={220}
            fontSize={48}
            width={100}
            height={100}
            fill="red"
          />
          <Rect
            x={30}
            y={200}
            fontSize={48}
            width={100}
            height={100}
            fill="yellow"
          />
        </Layer>*/}
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;
