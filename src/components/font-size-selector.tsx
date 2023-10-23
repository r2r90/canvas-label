import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface FontSizeSelector {
  value: number;
  fontSizeHandler: (e: number | undefined) => void;
}

export function FontSizeSelector({ value, fontSizeHandler }: FontSizeSelector) {
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
              defaultValue={[value ?? 16]}
              step={1}
              onValueChange={(e) => {
                fontSizeHandler(e[0]);
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
