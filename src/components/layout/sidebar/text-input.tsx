import React, { type ChangeEvent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addText } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";
import { Input } from "@/components/ui/input";
import { PiTextT } from "react-icons/pi";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function TextInput() {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState("");
  const [open, setOpen] = useState(false);
  const handleTextAdd = () => {
    dispatch(addText({ initialValue: inputText }));
    setOpen(false);
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className="text-xl"
        >
          <PiTextT />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="mt-4">
        <Card className="p-3">
          <CardHeader>
            <CardTitle>Ajouter votre text</CardTitle>
          </CardHeader>
          <Textarea
            id="description"
            placeholder="Entrez votre text ..."
            onChange={handleInputChange}
          />

          <CardFooter className="mt-8 justify-between">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTextAdd}>Submit</Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
