import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateText } from "@/store/app.slice";
import { FontFamilyPicker } from "./texte-editing-tools/text-family-picker";
import { FontSizeSelector } from "./texte-editing-tools/text-size-selector";
import type { ChangeEvent } from "react";
import { FontStyle } from "./texte-editing-tools/text-style-selector";
import { FontAlign } from "./texte-editing-tools/text-align-selector";
import { Separator } from "./ui/separator";
import { SpacingSettings } from "./texte-editing-tools/text-spacing-settings";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from "react-icons/ai";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const texts = useAppSelector((state) => state.app.texts);

  const currentText = texts.find((t) => t.id === selectedItemId);
  if (!currentText) return null;

  const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        fill: e.target.value,
      }),
    );
  };

  return (
    <div className="flex h-[5rem] w-full gap-6 border bg-white p-[1rem]">
      <FontFamilyPicker
        currentText={currentText}
        selectedItemId={selectedItemId}
      />
      <Separator orientation="vertical" />
      <FontStyle currentText={currentText} selectedItemId={selectedItemId} />
      <Separator orientation="vertical" />
      <FontAlign currentText={currentText} selectedItemId={selectedItemId} />
      <Separator orientation="vertical" />
      <FontSizeSelector
        currentText={currentText}
        selectedItemId={selectedItemId}
      />
      <Separator orientation="vertical" />
      <input
        className="my-auto "
        type="color"
        onChange={handleTextColorChange}
        value={currentText.fill}
      />
      <Separator orientation="vertical" />
      <SpacingSettings
        currentText={currentText}
        selectedItemId={selectedItemId}
      />
    </div>
  );
};
