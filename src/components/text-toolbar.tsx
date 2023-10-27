import { FontFamilyPicker } from "./texte-editing-tools/text-family-picker";
import { FontSizeSelector } from "./texte-editing-tools/text-size-selector";
import type { ChangeEvent } from "react";
import { FontStyle } from "./texte-editing-tools/text-style-selector";
import { FontAlign } from "./texte-editing-tools/text-align-selector";
import { Separator } from "./ui/separator";
import { SpacingSettings } from "./texte-editing-tools/text-spacing-settings";
import { type TransformableTextProps } from "@/components/transformable-text";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks";
import { deleteShape } from "@/store/app.slice";

type Props = {
  selectedItemId: string;
  currentText: TransformableTextProps["textProps"];
  onTextColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const TextToolbar = ({
  currentText,
  selectedItemId,
  onTextColorChange,
}: Props) => {
  const dispatch = useAppDispatch();
  if (!currentText) return null;
  const deleteTextHandler = (selectedItemId) => {
    dispatch(deleteShape(selectedItemId));
  };

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
      <Button onClick={() => deleteTextHandler(selectedItemId)}>
        Delete Text
      </Button>
    </>
  );
};
