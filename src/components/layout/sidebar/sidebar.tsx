import { TextInput } from "@/components/layout/sidebar/text-input";
import ImageInput from "@/components/layout/sidebar/image-input";
import { SelectTemplate } from "@/components/layout/sidebar/select-template";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks";
import SizeSelect from "@/components/layout/sidebar/size-select";

export function Sidebar() {
  return (
    <div className="flex h-full w-20 flex-col gap-2 p-2">
      <SizeSelect />
      <TextInput />
      <ImageInput />
      <SelectTemplate />
    </div>
  );
}
