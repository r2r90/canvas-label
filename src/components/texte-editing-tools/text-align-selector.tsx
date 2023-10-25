import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from "react-icons/ai";
import type { TextConfig } from "konva/lib/shapes/Text";
import { updateText } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  currentText: TextConfig;
  selectedItemId: string | null;
};

export const FontAlign = ({ currentText, selectedItemId }: Props) => {
  const dispatch = useAppDispatch();
  const handleTextAlignChange = (position: string) => {
    if (!selectedItemId) return;
    dispatch(
      updateText({
        id: selectedItemId,
        align: position,
      }),
    );
  };
  return (
    <div className="flex items-center gap-1">
      <Tabs
        value={currentText.align}
        className="flex-1"
        onValueChange={(value: string) => {
          if (value) handleTextAlignChange(value);
        }}
      >
        <div className="grid gap-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="left">
              <AiOutlineAlignLeft />
            </TabsTrigger>
            <TabsTrigger value="center">
              <AiOutlineAlignCenter />
            </TabsTrigger>
            <TabsTrigger value="right">
              <AiOutlineAlignRight />
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};
