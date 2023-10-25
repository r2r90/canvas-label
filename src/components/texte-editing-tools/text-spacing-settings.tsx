import { GiSettingsKnobs } from "react-icons/gi";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";
import type { TextConfig } from "konva/lib/shapes/Text";
import { useAppDispatch } from "@/hooks";
import { updateText } from "@/store/app.slice";

type Props = {
  currentText: TextConfig;
  selectedItemId: string | null;
};

export const SpacingSettings = ({ currentText, selectedItemId }: Props) => {
  const dispatch = useAppDispatch();

  const handleTextLetterSpacing = (e: number | undefined) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        letterSpacing: e,
      }),
    );
  };

  const handleLineHeight = (e: number | undefined) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        lineHeight: e,
      }),
    );
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <GiSettingsKnobs />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Letter Spacing</Label>
              <Slider
                id="fontSize"
                defaultValue={[currentText.letterSpacing ?? 0]}
                min={0}
                max={100}
                step={0.1}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                aria-label="letterSpacing"
                onValueChange={(e) => handleTextLetterSpacing(e[0])}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Line Height</Label>
              <Slider
                id="fontSize"
                defaultValue={[currentText.lineHeight ?? 1]}
                min={1}
                max={10}
                step={1}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                aria-label="lineHeight"
                onValueChange={(e) => handleLineHeight(e[0])}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
