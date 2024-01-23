import type { TransformableImageProps } from "@/components/transformable-image";
import type { TransformableTextProps } from "@/components/transformable-text";
import type { AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { createSlice, current } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { type WritableDraft } from "immer/src/types/types-external";
import { CANVAS_PADDING_X, CANVAS_PADDING_Y } from "@/consts/canvas-params";

export enum StageItemType {
  Text = "text",
  Image = "image",
}

type StageItemCommon = {
  id: string;
  isBlocked: boolean;
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
  history: [
    {
      stage: { width: 500, height: 500, scale: 1, x: 0, y: 0 },
      items: [] as StageItem[],
      selectedItemId: null as string | null,
      backgroundColor: null as string | null,
    },
  ],
  currentStep: 0,
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

const defaultBackgroundImageConfig = {
  x: 0,
  y: 0,
  opacity: 1,
  offsetX: 0,
  offsetY: 0,
  scaleX: 1,
  scaleY: 1,
};

const addNewItemToHistory =
  (
    callback: (
      state: WritableDraft<typeof initialState>,
      action: any,
      currentHistoryEntry: WritableDraft<
        (typeof initialState)["history"][number]
      >,
    ) => void,
  ) =>
  (state: WritableDraft<typeof initialState>, action: any) => {
    state.history.slice(0, state.currentStep + 1);
    const currentHistoryEntry = state.history[state.currentStep];
    if (!currentHistoryEntry) {
      return;
    }
    state.currentStep = state.history.length;
    callback(state, action, currentHistoryEntry);
  };

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    goBack: (state) => {
      if (state.currentStep === 0) {
        return;
      }
      state.currentStep = state.currentStep - 1;
    },
    goForward: (state) => {
      console.log(current(state));
      if (state.history.length - 1 === state.currentStep) {
        return;
      }
      state.currentStep = state.currentStep + 1;
    },
    //+
    setStageItems: addNewItemToHistory(
      (state, action: PayloadAction<StageItem[]>, currentHistoryEntry) => {
        const newHistoryEntry = {
          ...currentHistoryEntry,
          items: action.payload,
        };
        state.history.push(newHistoryEntry);
      },
    ),
    // +
    addText: addNewItemToHistory(
      (
        state,
        action: PayloadAction<{ initialValue: string }>,
        currentHistoryEntry,
      ) => {
        const newEntry = JSON.parse(
          JSON.stringify(currentHistoryEntry),
        ) as typeof currentHistoryEntry;
        const textId = v1();
        const newText = {
          type: StageItemType.Text,
          id: textId,
          isBlocked: false,
          params: {
            text: action.payload.initialValue,
            ...defaultTextConfig,
          },
        } as const;
        newEntry.items = [...newEntry.items, newText];
        state.history.push(newEntry);
      },
    ),
    // +
    addImage: addNewItemToHistory(
      (
        state,
        action: PayloadAction<{
          imageUrl: string;
          width: number;
          height: number;
        }>,
        currentHistoryEntry,
      ) => {
        const file = action.payload;
        if (!file) return;
        const imageId = v1();
        const newImage = {
          type: StageItemType.Image,
          id: imageId,
          isBlocked: false,
          params: {
            imageUrl: action.payload.imageUrl,
            width: action.payload.width,
            height: action.payload.height,
            ...defaultImageConfig,
          },
        } as const;
        const newHistoryEntry = {
          ...currentHistoryEntry,
          items: [...currentHistoryEntry.items, newImage],
        };
        state.history.push(newHistoryEntry);
      },
    ),
    // +
    setBlockedItem: addNewItemToHistory(
      (
        state,
        action: PayloadAction<{ id: string; blocked: boolean }>,
        currentHistoryEntry,
      ) => {
        const newEntry = JSON.parse(
          JSON.stringify(currentHistoryEntry),
        ) as typeof currentHistoryEntry;

        const itemToUpdate = newEntry.items.find(
          (item) => item.id === action.payload.id,
        );
        if (!itemToUpdate) return;
        if (newEntry.selectedItemId === itemToUpdate.id) {
          newEntry.selectedItemId = null;
        }
        itemToUpdate.isBlocked = action.payload.blocked;
        state.history.push(newEntry);
      },
    ),
    // +
    selectBackground: addNewItemToHistory(
      (state, action: PayloadAction<string>, currentHistoryEntry) => {
        state.history.push({
          ...currentHistoryEntry,
          backgroundColor: action.payload,
        });
      },
    ),

    setBackgroundImage: addNewItemToHistory(
      (
        state,
        action: PayloadAction<{
          imageUrl: string;
        }>,
        currentHistoryEntry,
      ) => {
        const image = action.payload;
        if (!image) return;
        const imageId = v1();
        const newImage = {
          type: StageItemType.Image,
          id: imageId,
          isBlocked: false,
          params: {
            imageUrl: action.payload.imageUrl,
            width: state.history[0]?.stage.width,
            height: state.history[0]?.stage.height,
            ...defaultBackgroundImageConfig,
          },
        } as const;
        const newHistoryEntry = {
          ...currentHistoryEntry,
          items: [...currentHistoryEntry.items, newImage],
        };
        state.history.push(newHistoryEntry);
      },
    ),
    // -
    selectItem: addNewItemToHistory(
      (state, action: PayloadAction<string>, currentHistoryEntry) => {
        const itemToSelect = currentHistoryEntry.items.find(
          (item) => item.id === action.payload,
        );

        if (!itemToSelect || itemToSelect.isBlocked) {
          return;
        }
        state.history.push({
          ...currentHistoryEntry,
          selectedItemId: action.payload,
        });
      },
    ),
    // -
    deselectItem: addNewItemToHistory((state, _action, currentHistoryEntry) => {
      state.history.push({
        ...currentHistoryEntry,
        selectedItemId: null,
      });
    }),
    // -
    updateStage: addNewItemToHistory(
      (
        state,
        action: PayloadAction<{ width?: number; height?: number }>,
        currentHistoryEntry,
      ) => {
        currentHistoryEntry.stage = {
          ...currentHistoryEntry.stage,
          ...action.payload,
        };
      },
    ),
    // +
    updateText: addNewItemToHistory(
      (
        state,
        action: PayloadAction<
          { id: string } & Partial<StageTextItem["params"]>
        >,
        currentHistoryEntry,
      ) => {
        const { id, ...params } = action.payload;
        const newEntry = JSON.parse(
          JSON.stringify(currentHistoryEntry),
        ) as typeof currentHistoryEntry;
        const textToUpdateIndex = newEntry.items.findIndex((t) => t.id === id);
        const textToUpdate = newEntry.items[textToUpdateIndex];

        if (
          !textToUpdate ||
          textToUpdate.type !== StageItemType.Text ||
          textToUpdate.isBlocked
        )
          return;

        newEntry.items[textToUpdateIndex] = {
          ...textToUpdate,
          params: {
            ...textToUpdate.params,
            ...params,
          },
        };
        state.history.push(newEntry);
      },
    ),
    // +
    updateImage: addNewItemToHistory(
      (
        state,
        action: PayloadAction<
          { id: string } & Partial<StageImageItem["params"]>
        >,
        currentHistoryEntry,
      ) => {
        const { id, ...params } = action.payload;
        const newEntry = JSON.parse(
          JSON.stringify(currentHistoryEntry),
        ) as typeof currentHistoryEntry;
        const imageToUpdateIndex = newEntry.items.findIndex(
          (img) => img.id === id,
        );
        const imageToUpdate = newEntry.items[imageToUpdateIndex];

        if (
          !imageToUpdate ||
          imageToUpdate.type !== StageItemType.Image ||
          imageToUpdate.isBlocked
        )
          return;

        newEntry.items = newEntry.items.map((item, index) => {
          if (index !== imageToUpdateIndex) return item;
          return {
            ...imageToUpdate,
            params: {
              ...imageToUpdate.params,
              ...params,
            },
          };
        });

        state.history.push(newEntry);
      },
    ),
    // +
    deleteStageItem: addNewItemToHistory(
      (state, action: PayloadAction<string>, currentHistoryEntry) => {
        const newEntry = {
          ...currentHistoryEntry,
          items: currentHistoryEntry.items.filter(
            (item) => item.id !== action.payload,
          ),
        };
        state.history.push(newEntry);
      },
    ),
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
  setBlockedItem,
  goBack,
  goForward,
  setBackgroundImage,
} = appSlice.actions;
