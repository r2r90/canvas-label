import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type StageItem, StageItemType } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import { Button } from "@/components/ui/button";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";

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
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="m-2 flex items-center justify-between rounded-md border p-2 text-black"
    >
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
      <Button>
        <HiOutlineLockClosed />
        <HiOutlineLockOpen />
      </Button>
    </div>
  );
}
