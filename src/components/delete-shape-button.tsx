import React from "react";
import { Button } from "@/components/ui/button";
import { deleteShape } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import { BsTrash3 } from "react-icons/bs";

type Props = {
  selectedItemId: string;
};

export const DeleteShapeButton = ({ selectedItemId }: Props) => {
  const dispatch = useAppDispatch();
  const deleteTextHandler = (selectedItemId: string) => {
    dispatch(deleteShape(selectedItemId));
  };
  return (
    <Button
      variant="destructive"
      color="cyan"
      onClick={() => deleteTextHandler(selectedItemId)}
    >
      <BsTrash3 />
    </Button>
  );
};
