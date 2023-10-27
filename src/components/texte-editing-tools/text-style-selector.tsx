import { Toggle } from "../ui/toggle";
import { updateText } from "@/store/app.slice";
import type { TextConfig } from "konva/lib/shapes/Text";
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { useAppDispatch } from "@/hooks";

type Props = {
  currentText: TextConfig;
  selectedItemId: string | null;
};

export function FontStyle({ currentText, selectedItemId }: Props) {
  const dispatch = useAppDispatch();

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
  return (
    <>
      <div className="flex items-center gap-1">
        <Toggle
          aria-label="Toggle italic"
          onClick={handleFontStyleToggle("bold")}
          value={currentText.fontStyle}
        >
          <FontBoldIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          aria-label="Toggle italic"
          onClick={handleFontStyleToggle("italic")}
          value={currentText.fontStyle}
        >
          <FontItalicIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          aria-label="Toggle italic"
          onClick={handleTextDecorationToggle("underline")}
          value={currentText.textDecoration}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle italic"
          onClick={handleTextDecorationToggle("line-through")}
          value={currentText.textDecoration}
        >
          <StrikethroughIcon className="h-4 w-4" />
        </Toggle>
      </div>
    </>
  );
}

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
