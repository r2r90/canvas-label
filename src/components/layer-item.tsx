import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  setBlockedItem,
  type StageItem,
  StageItemType,
} from "@/store/app.slice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { IconButton } from "@radix-ui/themes";
import { Eye, GripVertical, Lock, Trash2, Unlock } from "lucide-react";
import { DeleteShapeButton } from "@/components/delete-shape-button";
import VisibleShapeToggle from "@/components/visible-shape-toggle";

export default function LayerItem({ item }: { item: StageItem }) {
  const dispatch = useAppDispatch();
  const selectedItemId = useAppSelector((state) => state.app.selectedItemId);
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
      className="flex items-center justify-between rounded-md border  p-2 text-black"
    >
      <IconButton {...listeners}>
        <GripVertical size={18} />
      </IconButton>
      <span className="text-sm">{item.type}</span>

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

      <DeleteShapeButton selectedItemId={selectedItemId} />

      <VisibleShapeToggle />

      <span onClick={() => handleBlockItemClicked()}>
        {item.isBlocked ? <Lock size={18} /> : <Unlock size={18} />}
      </span>
    </div>
  );
}
