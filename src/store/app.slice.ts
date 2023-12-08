import type { TransformableImageProps } from "@/components/transformable-image";
import type { TransformableTextProps } from "@/components/transformable-text";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { type RectConfig } from "konva/lib/shapes/Rect";
import { type WritableDraft } from "immer/src/types/types-external";

export enum StageItemType {
  Text = "text",
  Image = "image",
}

type StageItemCommon = {
  id: string;
};

export type StageTextItem = {
  type: StageItemType.Text;
  params: TransformableTextProps["textProps"];
};

export type StageImageItem = {
  type: StageItemType.Image;
  params: TransformableImageProps["imageProps"];
};

type StageItemSpecific = StageTextItem | StageImageItem;

export type StageItem = StageItemCommon & StageItemSpecific;

const initialState = {
  stage: { width: 500, height: 500, scale: 1, x: 0, y: 0 },
  items: [] as StageItem[],
  selectedItemId: null as string | null,
  background: null as RectConfig | null,
};

const defaultTextConfig = {
  fontSize: 16,
  align: "center" as const,
  fontFamily: "Roboto",
  x: 100,
  y: 100,
  width: 100,
  height: 16,
};

const defaultImageConfig = {
  x: 50,
  y: 50,
  opacity: 1,
  offsetX: 0,
  offsetY: 0,
  scaleX: 1,
  scaleY: 1,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStageItems: (state, action: PayloadAction<StageItem[]>) => {
      state.items = action.payload;
    },
    setStageScale: (
      state,
      action: PayloadAction<{ x: number; y: number; scale: number }>,
    ) => {
      state.stage = {
        ...state.stage,
        ...action.payload,
      };
    },
    addText: (state, action: PayloadAction<{ initialValue: string }>) => {
      const textId = v1();
      state.items.push({
        type: StageItemType.Text,
        id: textId,
        params: {
          text: action.payload.initialValue,

          ...defaultTextConfig,
        },
      });
    },
    addImage: (
      state,
      action: PayloadAction<{
        imageUrl: string;
        width: number;
        height: number;
      }>,
    ) => {
      const file = action.payload;
      if (!file) return;
      const imageId = v1();
      state.items.push({
        type: StageItemType.Image,
        id: imageId,
        params: {
          imageUrl: action.payload.imageUrl,
          width: action.payload.width,
          height: action.payload.height,
          ...defaultImageConfig,
        },
      });
    },

    selectBackground: (state, action: PayloadAction<string>) => {
      state.background = {
        fill: action.payload,
      };
    },

    selectItem: (state, action: PayloadAction<string>) => {
      state.selectedItemId = action.payload;
    },

    deselectItem: (state) => {
      state.selectedItemId = null;
    },

    updateStage: (
      state,
      action: PayloadAction<{ width?: number; height?: number }>,
    ) => {
      state.stage = { ...state.stage, ...action.payload };
    },

    updateText: (
      state,
      action: PayloadAction<{ id: string } & Partial<StageTextItem["params"]>>,
    ) => {
      const { id, ...params } = action.payload;
      const textToUpdateIndex = state.items.findIndex((t) => t.id === id);
      const textToUpdate = state.items[textToUpdateIndex];

      if (!textToUpdate || textToUpdate.type !== StageItemType.Text) return;

      state.items[textToUpdateIndex] = {
        ...textToUpdate,
        params: {
          ...textToUpdate.params,
          ...params,
        },
      };
    },

    updateImage: (
      state,
      action: PayloadAction<{ id: string } & Partial<StageImageItem["params"]>>,
    ) => {
      const { id, ...params } = action.payload;
      const imageToUpdateIndex = state.items.findIndex((img) => img.id === id);
      const imageToUpdate = state.items[imageToUpdateIndex];

      if (!imageToUpdate || imageToUpdate.type !== StageItemType.Image) return;

      (state.items[imageToUpdateIndex] as WritableDraft<StageImageItem>) = {
        ...imageToUpdate,
        params: {
          ...imageToUpdate.params,
          ...params,
        },
      };
    },

    deleteStageItem: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    },
  },
});

export const {
  addImage,
  addText,
  deselectItem,
  updateText,
  updateImage,
  deleteStageItem,
  updateStage,
  selectBackground,
  setStageItems,
  selectItem,
} = appSlice.actions;
