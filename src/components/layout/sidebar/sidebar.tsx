import { TextInput } from "@/components/layout/sidebar/text-input";
import ImageInput from "@/components/layout/sidebar/image-input";
import SizeSelect from "@/components/layout/sidebar/size-select";
import { BackgroundSelect } from "@/components/layout/sidebar/background-select";
import { Layers } from "@/components/layout/sidebar/layers";
import { SelectTemplate } from "@/components/layout/sidebar/select-template";
import { ImageGallery } from "@/components/layout/sidebar/image-gallery";

export function Sidebar() {
  return (
    <div className="flex h-full w-20 flex-col items-center gap-2 p-2 pt-4">
      <SizeSelect />
      <TextInput />
      <ImageInput />
      <SelectTemplate />
      <BackgroundSelect />
      <ImageGallery />
      <Layers />
    </div>
  );
}
