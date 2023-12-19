import React, { type ChangeEvent } from "react";
import { addImage } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ImageInput() {
  const dispatch = useAppDispatch();

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = document.createElement("img");
    const imageUrl = URL.createObjectURL(file);
    img.onload = () => {
      dispatch(addImage({ imageUrl, width: img.width, height: img.height }));
      img.remove();
    };
    img.src = imageUrl;
    img.style.cssText = "display: none;";
    document.body.appendChild(img);
  };
  return (
    <Card className="p-2">
      <Input type="file" onChange={handleImageUploaded} />
      <CardDescription>
        Téléchargez votre image et ajoutez-la à votre étiquette.
      </CardDescription>
    </Card>
  );
}
