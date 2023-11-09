import { FontFamilyPicker } from "./texte-editing-tools/text-family-picker";
import { FontSizeSelector } from "./texte-editing-tools/text-size-selector";
import type { ChangeEvent } from "react";
import { FontStyle } from "./texte-editing-tools/text-style-selector";
import { FontAlign } from "./texte-editing-tools/text-align-selector";
import { Separator } from "./ui/separator";
import { SpacingSettings } from "./texte-editing-tools/text-spacing-settings";
import { type StageTextItem } from "@/store/app.slice";

type Props = {
  selectedItemId: string;
  currentText: StageTextItem["params"];
  onTextColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const TextToolbar = ({
  currentText,
  selectedItemId,
  onTextColorChange,
}: Props) => {
  if (!currentText) return null;

  return (
    <>
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
        onChange={onTextColorChange}
        value={currentText.fill}
      />
      <Separator orientation="vertical" />
      <SpacingSettings
        currentText={currentText}
        selectedItemId={selectedItemId}
      />
    </>
  );
};
