"use client";

import Die from "@/components/Die";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [diceValues, setdieValues] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  return (
    <main className="flex flex-col items-center justify-center-safe p-5 bg-background h-screen">
      <div className="bg-muted w-[100%] aspect-square rounded-2xl max-w-[400px] max-h-[400px] flex flex-col items-center justify-center-safe p-[2rem]">
        <h1 className="font-bold text-[1.5rem]">Tenzies</h1>
        <p className="text-center pt-[0.4rem] pb-[1.8rem] text-muted-foreground">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="grid grid-cols-5 gap-[1rem] pb-[2.5rem]">
          {diceValues.map((value, index) => {
            return <Die key={index} value={value} />;
          })}
        </div>
        <Button>Roll</Button>
      </div>
    </main>
  );
}
