import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAppDispatch } from "@/hooks";
import { updateImage } from "@/store/app.slice";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { type ImageConfig } from "konva/lib/shapes/Image";

type Props = {
  currentImage: ImageConfig;
  selectedItemId: string;
};

export default function ImageOpacityTool({
  selectedItemId,
  currentImage,
}: Props) {
  const dispatch = useAppDispatch();

  const value = currentImage.opacity ?? 1;

  const handleOpacityChange = (values: number[]) => {
    if (!selectedItemId) return;
    dispatch(
      updateImage({
        id: selectedItemId,
        opacity: values[0],
      }),
    );
  };

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="opacity">Opacity</Label>
            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
              {value}
            </span>
          </div>
          <Slider
            id="opacity"
            min={0}
            max={1}
            defaultValue={[currentImage.opacity ?? 16]}
            step={0.1}
            onValueChange={handleOpacityChange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="opacity"
          />
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
}
