"use client";

import * as React from "react";
import fonts from "../assets/fonts.json";
import {
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type Props = PopoverTriggerProps;

export function FontFamilyPicker({}: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedFont, setSelectedFont] = React.useState<string>("Roboto");

  useEffect(() => {
    fonts.items.map((font): void => {
      const fontLink = font.files.regular;
      const newFont = new FontFace(font.family, `url(${fontLink})`);
      newFont
        .load()
        .then((loadedFont) => {
          document.fonts.add(loadedFont);
        })
        .catch((e) => console.error(e));
    });
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between")}
        >
          {selectedFont}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search team..." />
            <CommandEmpty>No team found.</CommandEmpty>

            {fonts.items.map((font) => (
              <CommandItem
                key={font.family}
                onSelect={() => {
                  setSelectedFont(font.family);
                  setOpen(false);
                }}
                className="text-sm"
                style={{ fontFamily: font.family }}
              >
                {font.family}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedFont === font.family ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
