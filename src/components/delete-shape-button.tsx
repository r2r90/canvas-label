import React from "react";
import { deleteStageItem } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import { IconButton } from "@radix-ui/themes";
import { Trash2 } from "lucide-react";

type Props = {
  selectedItemId: string;
};

export const DeleteShapeButton = ({ selectedItemId }: Props) => {
  const dispatch = useAppDispatch();
  const deleteTextHandler = (selectedItemId: string) => {
    dispatch(deleteStageItem(selectedItemId));
  };
  return (
    <IconButton onClick={() => deleteTextHandler(selectedItemId)}>
      <Trash2 size={18} />
    </IconButton>
  );
};
