import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { updateText } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import type { TextConfig } from "konva/lib/shapes/Text";

type Props = {
  currentText: TextConfig;
  selectedItemId: string | null;
};

export function FontSizeSelector({ currentText, selectedItemId }: Props) {
  const dispatch = useAppDispatch();

  const value = currentText.fontSize ?? 16;

  const handleTextFontSizeChange = (e: number | undefined) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        fontSize: e,
      }),
    );
  };
  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="fontSize">Font Size</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="fontSize"
              min={1}
              max={100}
              defaultValue={[currentText.fontSize ?? 16]}
              step={1}
              onValueChange={(e) => {
                handleTextFontSizeChange(e[0]);
              }}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="fontSize"
            />
          </div>
        </HoverCardTrigger>
      </HoverCard>
    </>
  );
}
