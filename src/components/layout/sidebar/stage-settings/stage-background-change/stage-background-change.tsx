import React, { type ElementRef, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import * as process from "process";
import Image from "next/image";
import { selectBackground, setBackgroundImage } from "@/store/app.slice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { SliderPicker } from "react-color";

type Props = {
  open: boolean;
};

export const StageBackgroundChange = ({ open }: Props) => {
  const dispatch = useAppDispatch();
  const { stage } = useAppSelector((state) => state.app.history[0]);
  const [query, setQuery] = useState<string>("gradient");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const scrollAreaRef = useRef<ElementRef<"div">>(null);
  const mainUrl = "https://api.unsplash.com/photos";
  const searchUrl = "https://api.unsplash.com/search/photos";
  const clientID = `?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
  const bgColor = useAppSelector((state) => state.app.backgroundColor);

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  const fetchImages = async () => {
    setIsLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const { data } = await axios.get(url);

      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const ref = scrollAreaRef.current;
    const handler = () => {
      if (scrollAreaRef.current) {
        /*console.log(
          scrollAreaRef.current.clientHeight + scrollAreaRef.current.scrollTop,
          scrollAreaRef.current.scrollHeight - 2,
        );*/
      }
      if (
        isLoading ||
        !scrollAreaRef.current ||
        scrollAreaRef.current.clientHeight + scrollAreaRef.current.scrollTop <
          scrollAreaRef.current.scrollHeight - 2
      ) {
        return;
      }

      setPage((oldPage) => {
        return oldPage + 1;
      });
    };

    scrollAreaRef.current?.addEventListener("scroll", handler);
    return () => ref?.removeEventListener("scroll", handler);
  }, [isLoading, open]);

  const handleImageAdd = (url: string) => {
    dispatch(
      setBackgroundImage({
        imageUrl: url,
      }),
    );
  };

  const handleBackgroundSelect = (bgColor) => {
    // dispatch(selectBackground(bgColor.hex));

    console.log(bgColor);
  };

  return (
    <Card className="h-full min-h-[600px] p-3">
      {/*<Input
        type="text"
        placeholder="Search Images"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />


*/}

      <div className=" mt-4">
        {/*  <input
          className="h-[2rem] w-[2rem]"
          type="color"
          value={bgColor ?? undefined}
          onChange={(e) => handleBackgroundSelect(e.target.value)}
        />
        <input
          className="h-[2rem] w-[2rem]"
          type="color"
          value={bgColor ?? undefined}
          onChange={(e) => handleBackgroundSelect(e.target.value)}
        />*/}
        <SliderPicker
          color={bgColor}
          onChangeComplete={(e) => handleBackgroundSelect(e)}
        />
      </div>

      <div
        className="grid max-h-[550px] w-full grid-cols-2 justify-center gap-2 overflow-auto "
        ref={scrollAreaRef}
      >
        {photos?.map((p, i) => {
          return (
            <div
              key={i}
              onClick={() => handleImageAdd(p.urls.raw)}
              className="rounded-md border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Image
                key={p.i}
                src={p.urls.small}
                alt={"image"}
                height={100}
                width={100}
                className="h-32 w-full"
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};
