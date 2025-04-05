import { cn } from "@/lib/utils";
import React from "react";

export interface DieProps {
  value: number;
  isHeld: boolean;
}

const Die = ({ value, isHeld }: DieProps) => {
  return (
    <button
      className={cn(
        "h-[2.25rem] w-[2.25rem] rounded-[0.2rem] font-inter font-bold",
        isHeld ? "dark:bg-blue-800 bg-blue-400" : "bg-popover"
      )}
    >
      {value}
    </button>
  );
};

export default Die;
