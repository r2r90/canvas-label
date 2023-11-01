import type { TransformableImageProps } from "@/components/transformable-image";
import type { TransformableTextProps } from "@/components/transformable-text";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ChangeEvent } from "react";

import { createSlice, current } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import type { TextConfig } from "konva/lib/shapes/Text";
import type { ImageConfig } from "konva/lib/shapes/Image";

const initialState = {
  selectedItemId: null as string | null,
  images: [] as TransformableImageProps["imageProps"][],
  texts: [] as TransformableTextProps["textProps"][],
};

type InitialState = typeof initialState;

const defaultTextConfig = {
  fontSize: 16,
  align: "center",
  fontFamily: "Roboto",
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
    addText: (state, action: PayloadAction<{ initialValue: string }>) => {
      const textId = v1();
      state.texts.push({
        text: action.payload.initialValue,
        id: textId,
        ...defaultTextConfig,
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
} = appSlice.actions;
