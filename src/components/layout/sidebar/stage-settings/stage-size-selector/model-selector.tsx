"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { type PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { type Model, type ModelType } from "./models";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[];
  models: Model[];
}

export function ModelSelector({ models, types, ...props }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0]);

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">{`Selectionnez la taille d'etiquette`}</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] bg-yellow-400 text-sm"
          side="left"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          alias aut eaque eligendi fugiat harum, id ipsa ipsum maxime molestiae
          nesciunt nobis odio quisquam quos reprehenderit sapiente suscipit, vel
          voluptatibus.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedModel ? selectedModel.name : "Select a model..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="min-h-[500px] min-w-[200px] "
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">{peekedModel.name}</h4>
                <div className="text-sm text-muted-foreground">
                  {peekedModel.description}
                </div>
                {peekedModel.image ? (
                  <div>
                    <Image
                      src={peekedModel.image}
                      alt={peekedModel.name}
                      width={200}
                      height={500}
                    />
                  </div>
                ) : null}
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      .filter((model) => model.type === type)
                      .map((model) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onPeek={(model) => setPeekedModel(model)}
                          onSelect={() => {
                            setSelectedModel(model);
                            setOpen(false);
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Model) => void;
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(model);
        }
      }
    }
  });

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.name}

      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0",
        )}
      />
    </CommandItem>
  );
}
