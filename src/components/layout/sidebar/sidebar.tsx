import TextInput from "@/components/layout/sidebar/text-input/text-input";
import ImageInput from "@/components/layout/sidebar/image-input/image-input";
import { Layers } from "@/components/layout/sidebar/layers/layers";
import { ImageGallery } from "@/components/layout/sidebar/image-gallery/image-gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { LuLayoutTemplate } from "react-icons/lu";
import {
  ColumnsIcon,
  GearIcon,
  ImageIcon,
  LayersIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { StageSize } from "@/components/layout/sidebar/stage-settings/stage-size";
import { StageBackground } from "@/components/layout/sidebar/stage-settings/stage-background";
import { StageBackgroundChange } from "@/components/layout/sidebar/stage-settings/stage-background-change/stage-background-change";

export function Sidebar() {
  const [openGallery, setOpenGallery] = useState<boolean>(false);

  return (
    <div className="items-left flex w-full flex-col p-2 pt-4">
      <Tabs>
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="stage">
            <GearIcon />
          </TabsTrigger>
          <TabsTrigger value="image">
            <ImageIcon />
          </TabsTrigger>
          <TabsTrigger value="text">
            <TextIcon />
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setOpenGallery(true)}
            open={openGallery}
            onOpenChange={setOpenGallery}
            value="gallery"
          >
            <LuLayoutTemplate />
          </TabsTrigger>
          <TabsTrigger value="layers">
            <LayersIcon />
          </TabsTrigger>
          <TabsTrigger value="background">
            <ColumnsIcon />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stage">
          <StageSize />
          <StageBackground />
        </TabsContent>
        <TabsContent value="image">
          <ImageInput />
        </TabsContent>
        <TabsContent value="text">
          <TextInput />
        </TabsContent>
        <TabsContent value="gallery">
          <ImageGallery open={openGallery} />
        </TabsContent>
        <TabsContent value="layers">
          <Layers />
        </TabsContent>
        <TabsContent value="background">
          <StageBackgroundChange />
        </TabsContent>
      </Tabs>
    </div>
  );
}
