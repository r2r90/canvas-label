import { GiSettingsKnobs } from "react-icons/gi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";

export const SpacingSettings = () => {
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
              <Label htmlFor="width">Width</Label>
              <Slider
              id="fontSize"
              min={1}
              max={100}
              step={1}
         
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="fontSize"
            />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Letter Spacing</Label>
              <Slider
              id="fontSize"
              min={1}
              max={100}
              step={1}
         
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="fontSize"
            />
            </div>
          </div>
          
        </div>
      </PopoverContent>
      
    </Popover>
  );
};
