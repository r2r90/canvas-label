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
import { useCallback, useEffect, useRef, useState } from "react";
import { Toolbar } from "@/components/toolbar";
import TransformableText from "@/components/transformable-text";
import LayerBorder from "@/components/layer-border";
import { CANVAS_PADDING_X, CANVAS_PADDING_Y } from "@/consts/canvas-params";
import Legacy from "@/components/layout/sidebar/legacy";
import { type Shape } from "konva/lib/Shape";
import Konva from "konva";

type Snap = "start" | "center" | "end";
type SnappingEdges = {
  vertical: Array<{
    guide: number;
    offset: number;
    snap: Snap;
  }>;
  horizontal: Array<{
    guide: number;
    offset: number;
    snap: Snap;
  }>;
};

const GUIDELINE_OFFSET = 5;

const Canvas = () => {
  const dispatch = useAppDispatch();
  const stage = useAppSelector((state) => state.app.stage);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
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

  /*  Drag Drop logic */

  const getObjectSnappingEdges = useCallback((node: Shape): SnappingEdges => {
    const box = node.getClientRect();
    const absPos = node.absolutePosition();

    return {
      vertical: [
        {
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: "start",
        },
        {
          guide: Math.round(box.x + box.width / 2),
          offset: Math.round(absPos.x - box.x - box.width / 2),
          snap: "center",
        },
        {
          guide: Math.round(box.x + box.width),
          offset: Math.round(absPos.x - box.x - box.width),
          snap: "end",
        },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: "start",
        },
        {
          guide: Math.round(box.y + box.height / 2),
          offset: Math.round(absPos.y - box.y - box.height / 2),
          snap: "center",
        },
        {
          guide: Math.round(box.y + box.height),
          offset: Math.round(absPos.y - box.y - box.height),
          snap: "end",
        },
      ],
    };
  }, []);

  const getLineGuideStops = (skipShape: Konva.Shape) => {
    const stage = skipShape.getStage();
    if (!stage) return { vertical: [], horizontal: [] };

    // we can snap to playground-area borders and the center of the playground-area
    const vertical = [0, stage.width() / 2, stage.width()];
    const horizontal = [0, stage.height() / 2, stage.height()];

    // and we snap over edges and center of each object on the canvas
    stage.find(".object").forEach((guideItem) => {
      if (guideItem === skipShape) {
        return;
      }
      const box = guideItem.getClientRect();
      // and we can snap to all edges of shapes
      vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
      horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
    });
    return {
      vertical,
      horizontal,
    };
  };

  const getGuides = useCallback(
    (
      lineGuideStops: ReturnType<typeof getLineGuideStops>,
      itemBounds: ReturnType<typeof getObjectSnappingEdges>,
    ) => {
      const resultV: Array<{
        lineGuide: number;
        diff: number;
        snap: Snap;
        offset: number;
      }> = [];

      const resultH: Array<{
        lineGuide: number;
        diff: number;
        snap: Snap;
        offset: number;
      }> = [];

      lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
          const diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < GUIDELINE_OFFSET) {
            resultV.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset,
            });
          }
        });
      });

      lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
          const diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < GUIDELINE_OFFSET) {
            resultH.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset,
            });
          }
        });
      });

      const guides: Array<{
        lineGuide: number;
        offset: number;
        orientation: "V" | "H";
        snap: "start" | "center" | "end";
      }> = [];

      const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
      const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

      if (minV) {
        guides.push({
          lineGuide: minV.lineGuide,
          offset: minV.offset,
          orientation: "V",
          snap: minV.snap,
        });
      }

      if (minH) {
        guides.push({
          lineGuide: minH.lineGuide,
          offset: minH.offset,
          orientation: "H",
          snap: minH.snap,
        });
      }

      return guides;
    },
    [],
  );
  const drawGuides = useCallback(
    (guides: ReturnType<typeof getGuides>, layer: Konva.Layer) => {
      guides.forEach((lg) => {
        if (lg.orientation === "H") {
          const line = new Konva.Line({
            points: [-6000, 0, 6000, 0],
            stroke: "rgb(0, 161, 255)",
            strokeWidth: 1,
            name: "guid-line",
            dash: [4, 6],
          });
          layer.add(line);
          line.absolutePosition({
            x: 0,
            y: lg.lineGuide,
          });
        } else if (lg.orientation === "V") {
          const line = new Konva.Line({
            points: [0, -6000, 0, 6000],
            stroke: "rgb(0, 161, 255)",
            strokeWidth: 1,
            name: "guid-line",
            dash: [4, 6],
          });
          layer.add(line);
          line.absolutePosition({
            x: lg.lineGuide,
            y: 0,
          });
        }
      });
    },
    [],
  );
  const onDragMove = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      const layer = e.target.getLayer();
      if (!layer) {
        return;
      }
      // clear all previous lines on the screen
      layer.find(".guid-line").forEach((l) => l.destroy());

      // find possible snapping lines
      const lineGuideStops = getLineGuideStops(e.target as Konva.Shape);
      // find snapping points of current object
      const itemBounds = getObjectSnappingEdges(e.target as Konva.Shape);

      // now find where can we snap current object
      const guides = getGuides(lineGuideStops, itemBounds);

      // do nothing if no snapping
      if (!guides.length) {
        return;
      }

      drawGuides(guides, layer);

      const absPos = e.target.absolutePosition();
      // now force object position
      guides.forEach((lg) => {
        switch (lg.snap) {
          case "start": {
            switch (lg.orientation) {
              case "V": {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case "H": {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
          case "center": {
            switch (lg.orientation) {
              case "V": {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case "H": {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
          case "end": {
            switch (lg.orientation) {
              case "V": {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case "H": {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
        }
      });
      e.target.absolutePosition(absPos);
    },
    [drawGuides, getGuides, getObjectSnappingEdges],
  );

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const layer = e.target.getLayer();
    // clear all previous lines on the screen
    layer?.find(".guid-line").forEach((l) => l.destroy());
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <Toolbar />
      <div
        className={
          "vertical-line horizontal-line flex h-full w-full items-center justify-center"
        }
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          dispatch(deselectItem());
        }}
      >
        <Stage
          className="bg-white"
          ref={stageRef}
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
            ref={layerRef}
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
                    imageProps={{
                      ...item.params,
                      onDragMove,
                      onDragEnd,
                      name: "object",
                    }}
                    key={item.id}
                    isBlocked={item.isBlocked}
                  />
                );
              }
              if (item.type === StageItemType.Text) {
                return (
                  <TransformableText
                    isEditing={isEditing}
                    isBlocked={item.isBlocked}
                    onEditChange={toggleEdit}
                    onSelect={() => selectItem(item.id)}
                    isSelected={item.id === selectedItemId}
                    onChange={(newAttrs) => {
                      dispatch(updateText({ id: item.id, ...newAttrs }));
                    }}
                    textProps={{
                      ...item.params,
                      onDragMove,
                      onDragEnd,
                      name: "object",
                    }}
                    key={item.id}
                    id={item.id}
                  />
                );
              }
            })}
          </Layer>
          <Legacy stageParams={stage} />

          <LayerBorder />
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;
