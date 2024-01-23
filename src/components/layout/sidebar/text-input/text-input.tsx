import React, { type ChangeEvent, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addText } from "@/store/app.slice";
import { useAppDispatch } from "@/hooks";

export default function TextInput() {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState("");
  const handleTextAdd = () => {
    dispatch(addText({ initialValue: inputText }));
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };
  return (
    <Card className="p-3">
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
      <CardDescription>
        Téléchargez votre image et ajoutez-la à votre étiquette.
      </CardDescription>
    </Card>
  );
}
