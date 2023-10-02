import { TransformableImageProps } from "@/components/transformable-image";
import { TransformableTextProps } from "@/components/transformable-text";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { KonvaEventObject } from "konva/lib/Node";
import { ChangeEvent } from "react";
import { v1 } from "uuid";

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
  },
});
