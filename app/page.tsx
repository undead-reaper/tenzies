"use client";

import Die from "@/components/Die";
import type { DieProps } from "@/components/Die";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DicesIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [diceValues, setDiceValues] = useState<DieProps[]>();
  const [loading, setLoading] = useState(true);

  function handleGenerateDice() {
    const result = Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
    setLoading(false);
    return result;
  }

  useEffect(() => {
    setDiceValues(handleGenerateDice());
  }, []);

  function handleRollDice() {
    setLoading(true);
    setDiceValues(handleGenerateDice());
  }

  return (
    <main className="flex flex-col items-center justify-center-safe p-5 bg-background h-screen">
      <div className="bg-muted w-[100%] aspect-square rounded-2xl max-w-[400px] max-h-[400px] flex flex-col items-center justify-center-safe p-[2rem]">
        <h1 className="font-bold text-[1.5rem]">Tenzies</h1>
        <p className="text-center pt-[0.4rem] pb-[1.8rem] text-muted-foreground">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div
          className={cn(
            "gap-[1rem] pb-[2.5rem]",
            loading
              ? "flex flex-col items-center justify-center"
              : "grid grid-cols-5"
          )}
        >
          {loading ? (
            <Loader2 className="animate-spin text-muted-foreground" />
          ) : (
            diceValues!.map((die, index) => {
              return <Die key={index} value={die.value} isHeld={die.isHeld} />;
            })
          )}
        </div>
        <Button onClick={handleRollDice}>
          <DicesIcon />
          Roll
        </Button>
      </div>
    </main>
  );
}
