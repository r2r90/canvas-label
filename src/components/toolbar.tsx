import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateText } from "@/store/app.slice";
import { Toggle } from "@/components/ui/toggle";
import { FontFamilyPicker } from "./font-family-picker";
import { FontSizeSelector } from "./font-size-selector";
import { useState, type ChangeEvent } from "react";
import { SpacingSettings } from "./spacing-settings";

export const Toolbar = () => {
  const [alignment, setAlignment] = useState("left");
  const dispatch = useAppDispatch();
  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const texts = useAppSelector((state) => state.app.texts);

  const currentText = texts.find((t) => t.id === selectedItemId);

  if (!currentText) return null;

  const handleFontStyleToggle = (button: "bold" | "italic") => () => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        fontStyle: getFontStyle(currentText.fontStyle, button),
      }),
    );
  };

  const handleTextDecorationToggle =
    (button: "underline" | "line-through") => () => {
      if (!selectedItemId) return;

      dispatch(
        updateText({
          id: selectedItemId,
          textDecoration: getFontStyle(currentText.textDecoration, button),
        }),
      );
    };

  const handleTextFontSizeChange = (e: number | undefined) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        fontSize: e,
      }),
    );
  };

  const handleTextFontFamilyChange = (e: string | undefined) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        fontFamily: e,
      }),
    );
  };
  const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        fill: e.target.value,
      }),
    );
  };

  const handleTextAlignChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        align: e.target.value,
      }),
    );
  };

  const handleAlignmentChange = (newAlignment: string | undefined) => {};

  return (
    <div className="flex h-[5rem] w-full gap-6 border bg-white p-[1rem] transition">
      <Toggle
        className="data-[state=on]:font-bold"
        onClick={handleFontStyleToggle("bold")}
      >
        B
      </Toggle>
      <Toggle
        className="data-[state=on]:italic"
        onClick={handleFontStyleToggle("italic")}
      >
        I
      </Toggle>
      <Toggle
        className="underline data-[state=on]:no-underline"
        onClick={handleTextDecorationToggle("underline")}
      >
        U
      </Toggle>
      <Toggle
        className="line-through data-[state=on]:no-underline"
        onClick={handleTextDecorationToggle("line-through")}
      >
        S
      </Toggle>

      <FontSizeSelector
        value={currentText.fontSize ?? 16}
        fontSizeHandler={handleTextFontSizeChange}
      />
      <input
        type="color"
        onChange={handleTextColorChange}
        value={currentText.fill}
      />
      <FontFamilyPicker
        handleTextFontFamilyChange={handleTextFontFamilyChange}
        selectedFont={currentText.fontFamily}
      />

      <Toggle
        className="data-[state=on]:font-bold"
        onClick={handleAlignmentChange("left")}
      ></Toggle>

      <SpacingSettings />
    </div>
  );
};

const getFontStyle = (
  currentStyle: string | undefined,
  buttonClicked: "bold" | "italic" | "underline" | "line-through",
) => {
  if (buttonClicked === "bold") {
    if (currentStyle?.includes("bold")) {
      return currentStyle?.replace("bold", "").trim();
    }
    return ((currentStyle ?? "") + " bold").trim();
  }
  if (buttonClicked === "italic") {
    if (currentStyle?.includes("italic")) {
      return currentStyle?.replace("italic", "").trim();
    }
    return ((currentStyle ?? "") + " italic").trim();
  }
  if (buttonClicked === "underline") {
    if (currentStyle?.includes("underline")) {
      return currentStyle?.replace("underline", "").trim();
    }
    return ((currentStyle ?? "") + " underline").trim();
  }
  if (buttonClicked === "line-through") {
    if (currentStyle?.includes("line-through")) {
      return currentStyle?.replace("line-through", "").trim();
    }
    return ((currentStyle ?? "") + " line-through").trim();
  }
};
