import React, { ChangeEvent } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { PiImageDuotone } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { addImage } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function ImageInput() {
  const dispatch = useAppDispatch();

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addImage(e));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="text-xl">
          <PiImageDuotone />
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
