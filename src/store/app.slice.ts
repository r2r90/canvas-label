import type { TransformableImageProps } from "@/components/transformable-image";
import type { TransformableTextProps } from "@/components/transformable-text";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { KonvaEventObject } from "konva/lib/Node";
import type { ChangeEvent } from "react";

import { createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { TextConfig } from "konva/lib/shapes/Text";

const initialState = {
  selectedItemId: null as string | null,
  images: [] as TransformableImageProps["imageProps"][],
  texts: [] as TransformableTextProps["textProps"][],
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

      state.texts.push({ text: action.payload.initialValue, id: textId });
    },

    selectItem: (state, action: PayloadAction<string>) => {
      state.selectedItemId = action.payload;
    },

    checkDeselect: (
      state,
      action: PayloadAction<KonvaEventObject<MouseEvent>>,
    ) => {
      // deselect when clicked on empty area
      const clickedOnEmpty =
        action.payload.target === action.payload.target.getStage();
      if (clickedOnEmpty) {
        state.selectedItemId = null;
      }
    },

    updateText: (
      state,
      action: PayloadAction<Omit<TextConfig, "id"> & { id: string }>,
    ) => {
      const textToUpdate = state.texts.findIndex(
        (t) => t.id === action.payload.id,
      );
      state.texts[textToUpdate] = action.payload;
    },
  },
});

export const { addImage, addText, selectItem, checkDeselect, updateText } =
  appSlice.actions;


