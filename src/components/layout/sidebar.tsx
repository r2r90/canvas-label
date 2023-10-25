import { addImage, addText } from "@/store/app.slice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/hooks";
import { ChangeEvent, useState } from "react";

export function Sidebar() {
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState("");

  const handleImageUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addImage(e));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleTextAdd = () => dispatch(addText({ initialValue: inputText }));

  return (
    <div className="flex h-full max-w-[20rem] flex-col">
      <Input
        type="file"
        className="m-[2rem] w-auto "
        onChange={handleImageUploaded}
      />
      <div className="m-[2rem] flex max-w-md justify-between">
        <Input
          type="text"
          placeholder="enter the text"
          value={inputText}
          onChange={handleInputChange}
        />
        <Button className="mx-[2rem] text-xs" onClick={handleTextAdd}>
          Add new Text
        </Button>
      </div>
    </div>
  );
}
