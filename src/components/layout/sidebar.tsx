import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  handleImageUploaded: any;
  handleInputChange: any;
  inputText: any;
  handleTextAdd: any;
};

export function Sidebar({
  handleImageUploaded,
  handleInputChange,
  handleTextAdd,
  inputText,
}: Props) {
  return (
    <div className="flex flex-col ">
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
