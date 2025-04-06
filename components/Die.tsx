import { cn } from "@/lib/utils";
import React from "react";

export interface DieContent {
  id: string;
  value: number;
  isHeld: boolean;
}

interface DieProps {
  content: DieContent;
  onClick: (id: string) => void;
}

const Die = ({ content, onClick }: DieProps) => {
  return (
    <button
      onClick={() => onClick(content.id)}
      aria-label={`Die with value ${content.value}, ${
        content.isHeld ? "Held" : "Not Held"
      }`}
      aria-pressed={content.isHeld}
      className={cn(
        "h-[2.25rem] w-[2.25rem] rounded-[0.2rem] font-inter font-bold",
        content.isHeld ? "dark:bg-blue-800 bg-blue-400" : "bg-popover"
      )}
    >
      {content.value}
    </button>
  );
};

export default Die;
