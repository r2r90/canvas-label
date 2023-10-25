"use client";

import * as React from "react";
import fonts from "../../assets/fonts.json";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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

import { useEffect, useState } from "react";
import { updateText } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import type { TextConfig } from "konva/lib/shapes/Text";

type Props = {
  currentText: TextConfig;
  selectedItemId: string | null;
};

export function FontFamilyPicker({ currentText, selectedItemId }: Props) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleTextFontFamilyChange = (e: string | undefined) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        fontFamily: e,
      }),
    );
  };

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

  const selectedFont = currentText.fontFamily ?? "Roboto";

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
                  setOpen(false);
                  handleTextFontFamilyChange(font.family);
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
