import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateText } from "@/store/app.slice";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
  const texts = useAppSelector((state) => state.app.texts);

  const currentText = texts.find((t) => t.id === selectedItemId);

  console.log(currentText);

  if (!currentText) return null;

  const handleFontStyleToggle = (button: "bold" | "italic") => () => {
    dispatch(
      updateText({
        ...currentText,
        fontStyle: getFontStyle(
          currentText.fontStyle as string | undefined,
          button,
        ),
      }),
    );
  };

  return (
    <div className="flex gap-6">
      <button onClick={handleFontStyleToggle("italic")}>Italic</button>
      <button onClick={handleFontStyleToggle("bold")}>Bold</button>
    </div>
  );
};

const getFontStyle = (
  currentStyle: string | undefined,
  buttonClicked: "bold" | "italic",
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
};
