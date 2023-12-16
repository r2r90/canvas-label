import React, { type ElementRef, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import * as process from "process";
import { LuLayoutTemplate } from "react-icons/lu";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export const ImageGallery = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [photos, setPhotos] = useState<any[]>([]);

  const scrollAreaRef = useRef<ElementRef<"div">>(null);

  const mainUrl = "https://api.unsplash.com/photos";
  const searchUrl = "https://api.unsplash.com/search/photos";
  const clientID = `?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;

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
      console.log(url);
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
          console.log(data);
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
        console.log(
          scrollAreaRef.current.clientHeight + scrollAreaRef.current.scrollTop,
          scrollAreaRef.current.scrollHeight - 2,
        );
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="text-xl"
        >
          <LuLayoutTemplate />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="mt-4">
        <Card className="p-3">
          <CardHeader className="mb-2 p-2 text-center">
            <CardTitle>Template</CardTitle>
          </CardHeader>

          <Input
            type="text"
            placeholder="Search Images"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div
            className=" grid h-64 w-full grid-cols-2 gap-4 overflow-auto"
            ref={scrollAreaRef}
          >
            {photos?.map((p, i) => (
              <div
                key={i}
                className="rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Image
                  key={p.i}
                  src={p.urls.small}
                  alt={"image"}
                  height={100}
                  width={100}
                />
              </div>
            ))}
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
