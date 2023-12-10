import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  setBlockedItem,
  type StageItem,
  StageItemType,
} from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import { Button } from "@/components/ui/button";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";
import { IconButton } from "@radix-ui/themes";
import { GripVertical } from "lucide-react";

export default function LayerItem({ item }: { item: StageItem }) {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleBlockItemClicked = () => {
    dispatch(setBlockedItem({ id: item.id, blocked: !item.isBlocked }));
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      className="m-2 flex items-center justify-between rounded-md border p-2 text-black"
    >
      <IconButton {...listeners}>
        <GripVertical />
      </IconButton>
      <span className="">{item.type}</span>

      {item.type === StageItemType.Text ? (
        item.params.text < 5 ? (
          item.params.text
        ) : (
          item.params.text?.substring(0, 5) + "..."
        )
      ) : (
        <img
          className="max-h-8 w-8"
          alt={item.params.imageUrl}
          src={item.params.imageUrl}
        />
      )}
      <Button onClick={handleBlockItemClicked}>
        {item.isBlocked ? <HiOutlineLockClosed /> : <HiOutlineLockOpen />}
      </Button>
    </div>
  );
}
