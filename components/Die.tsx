import React from "react";

interface DieProps {
  value: number;
}

const Die = ({ value }: DieProps) => {
  return (
    <button className="bg-popover h-[2.25rem] w-[2.25rem] rounded-[0.2rem] font-inter">
      {value}
    </button>
  );
};

export default Die;
