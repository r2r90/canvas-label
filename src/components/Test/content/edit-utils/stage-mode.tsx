import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiBeerBottle } from "react-icons/pi";

export default function StageMode() {
  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Taille de l&apos;etquieutte
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-[320px] text-sm" side="left">
          Sélectionnez la taille de votre raquette parmi les trois tailles
          disponibles : S, M, L.
        </HoverCardContent>
      </HoverCard>
      <TabsList className="grid h-[2.5rem] grid-cols-3">
        <TabsTrigger value="complete">
          <span className="sr-only">Complete</span>
          <PiBeerBottle size={10} />
        </TabsTrigger>
        <TabsTrigger value="insert">
          <span className="sr-only">Insert</span>
          <PiBeerBottle size={15} />
        </TabsTrigger>
        <TabsTrigger value="edit">
          <span className="sr-only">Edit</span>
          <PiBeerBottle size={22} />
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
