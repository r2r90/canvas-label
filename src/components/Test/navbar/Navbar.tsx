import React from "react";
import { Save } from "@/components/Test/navbar/Save";
import { Preview } from "@/components/Test/navbar/Preview";
import { SelectVigneron } from "@/components/Test/navbar/select-vigneron";
import { presets } from "@/components/Test/navbar/list-de-vignerons";
import { UserNav } from "@/components/layout/user-nav";

export default function Navbar() {
  return (
    <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <h2 className="text-lg font-semibold">Vitiquette</h2>
      <div className="ml-auto flex w-full space-x-2 sm:justify-end">
        <SelectVigneron presets={presets} />
        <Save />
        <Preview />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}
