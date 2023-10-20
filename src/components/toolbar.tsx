import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateText } from "@/store/app.slice";
import { Toggle } from "@/components/ui/toggle";
import { Select } from "@/components/ui/select";
import { FontFamilyPicker } from "./font-family-picker";
import { FontSizeSelector } from "./font-size-selector";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const texts = useAppSelector((state) => state.app.texts);

  const currentText = texts.find((t) => t.id === selectedItemId);

  if (!currentText) return null;

  const handleFontStyleToggle = (button: "bold" | "italic") => () => {
    dispatch(
      updateText({
        ...currentText,
        fontStyle: getFontStyle(currentText.fontStyle, button),
      }),
    );
  };

  const handleTextDecorationToggle =
    (button: "underline" | "line-through") => () => {
      dispatch(
        updateText({
          ...currentText,
          textDecoration: getFontStyle(currentText.textDecoration, button),
        }),
      );
    };

  const handleTextFontSizeChange = (e: number | undefined) => {
    dispatch(
      updateText({
        ...currentText,
        fontSize: e,
      }),
    );
  };

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
      <input type="color" />
      <FontFamilyPicker />
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
