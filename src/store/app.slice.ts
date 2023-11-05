import type { TransformableImageProps } from "@/components/transformable-image";
import type { TransformableTextProps } from "@/components/transformable-text";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { type RectConfig } from "konva/lib/shapes/Rect";

const initialState = {
  stage: { width: 500, height: 500 },
  selectedItemId: null as string | null,
  images: [] as TransformableImageProps["imageProps"][],
  texts: [] as TransformableTextProps["textProps"][],
  backgroundRects: [] as RectConfig[],
};

const defaultTextConfig = {
  fontSize: 16,
  align: "center",
  fontFamily: "Roboto",
  zIndex: 3,
};

const defaultImageConfig = {
  x: 50,
  y: 50,
  opacity: 1,
  offsetX: 0,
  offsetY: 0,
  scaleX: 1,
  scaleY: 1,
  zIndex: 1,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addText: (state, action: PayloadAction<{ initialValue: string }>) => {
      const textId = v1();
      state.texts.push({
        text: action.payload.initialValue,
        id: textId,
        ...defaultTextConfig,
      });
    },

    selectBackground: (state, action: PayloadAction<string>) => {
      state.backgroundRects = [];
      state.backgroundRects.push({
        x: 0,
        y: 0,
        stroke: "black",
        z_index: 0,
        width: state.stage.width,
        height: state.stage.height,
        fill: action.payload,
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

      state.images.push({
        imageUrl: action.payload.imageUrl,
        id: imageId,
        width: action.payload.width,
        height: action.payload.height,
        ...defaultImageConfig,
      });
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
      action: PayloadAction<{ id: string } & Partial<TransformableTextProps>>,
    ) => {
      const textToUpdateIndex = state.texts.findIndex(
        (t) => t.id === action.payload.id,
      );
      const textToUpdate = state.texts[textToUpdateIndex];

      if (!textToUpdate) return;

      state.texts[textToUpdateIndex] = {
        ...textToUpdate,
        ...action.payload,
      };
    },

    updateImage: (
      state,
      action: PayloadAction<{ id: string } & Partial<TransformableImageProps>>,
    ) => {
      const imageToUpdateIndex = state.images.findIndex(
        (img) => img.id === action.payload.id,
      );
      const imageToUpdate = state.images[imageToUpdateIndex];

      if (!imageToUpdate) return;

      state.images[imageToUpdateIndex] = {
        ...imageToUpdate,
        ...action.payload,
      };
    },

    deleteShape: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        texts: state.texts.filter((shape) => shape.id !== action.payload),
        images: state.images.filter((shape) => shape.id !== action.payload),
      };
    },
  },
});

export const {
  addImage,
  addText,
  selectItem,
  deselectItem,
  updateText,
  updateImage,
  deleteShape,
  updateStage,
  selectBackground,
} = appSlice.actions;
