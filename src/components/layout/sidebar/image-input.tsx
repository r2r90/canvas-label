import React, { type ChangeEvent } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addImage } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RxImage } from "react-icons/rx";

function ImageInput() {
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-xl">
          <RxImage />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        {/*<Input type="file" onChange={handleImageUploaded} />*/}

        <Card className="p-2">
          <CardHeader>
            <CardTitle className="text-center">Ajouter votre image</CardTitle>
          </CardHeader>

          <Input type="file" onChange={handleImageUploaded} />
        </Card>
      </PopoverContent>
    </Popover>
  );
}

export default ImageInput;
