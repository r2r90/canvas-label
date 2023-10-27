import type { TransformableImageProps } from "@/components/transformable-image";
import type { TransformableTextProps } from "@/components/transformable-text";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ChangeEvent } from "react";

import { createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import type { TextConfig } from "konva/lib/shapes/Text";
import { RootState } from "./store";

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

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<ChangeEvent<HTMLInputElement>>) => {
      const file = action.payload.target.files?.[0];
      if (!file) return;
      const imageId = v1();
      const imageUrl = URL.createObjectURL(file);
      state.images.push({ imageUrl, id: imageId });
    },

    addText: (state, action: PayloadAction<{ initialValue: string }>) => {
      const textId = v1();
      console.log(state);
      state.texts.push({
        text: action.payload.initialValue,
        id: textId,
        ...defaultTextConfig,
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
      action: PayloadAction<{ id: string } & Partial<TextConfig>>,
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

    deleteShape: (state, action: PayloadAction<string>) => {
      console.log(state.texts);
      return {
        ...state,
        texts: state.texts.filter((shape) => shape.id !== action.payload),
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
  deleteShape,
} = appSlice.actions;
