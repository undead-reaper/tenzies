"use client";

import Die from "@/components/Die";
import type { DieContent } from "@/components/Die";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DicesIcon, Loader2, PartyPopper } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { useIsMounted } from "@/lib/utils";

const generateRandomValue = () => Math.ceil(Math.random() * 6);

const generateDice = () => {
  return Array.from({ length: 10 }, () => ({
    id: nanoid(),
    value: generateRandomValue(),
    isHeld: false,
  }));
};

export default function Home() {
  const isMounted = useIsMounted();

  const [diceValues, setDiceValues] = useState<DieContent[]>(() => {
    const dice = generateDice();
    return dice;
  });
  const [gameWon, setGameWon] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!diceValues.length) return;

    const allHeld = diceValues.every((die) => die.isHeld);
    const firstValue = diceValues[0].value;
    const allSameValue = diceValues.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setGameWon(true);
      buttonRef.current!.focus();
    }
  }, [diceValues]);

  const handleRollDice = () => {
    if (gameWon) {
      setGameWon(false);
      setDiceValues(generateDice());
    } else {
      setDiceValues((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: generateRandomValue() }
        )
      );
    }
  };

  const handleHoldDice = (id: string) => {
    setDiceValues((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  if (!isMounted) {
    return (
      <main className="flex flex-col items-center justify-center p-5 bg-background h-screen">
        <div className="bg-muted w-[100%] aspect-square rounded-2xl max-w-[400px] max-h-[400px] flex items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center-safe p-5 bg-background h-screen">
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again</p>
        )}
      </div>
      <div className="bg-muted w-[100%] aspect-square rounded-2xl max-w-[400px] max-h-[400px] flex flex-col items-center justify-center-safe p-[2rem]">
        <h1 className="font-bold text-[1.5rem]">Tenzies</h1>
        <p className="text-center pt-[0.4rem] pb-[1.8rem] text-muted-foreground">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className={cn("gap-[1rem] pb-[2.5rem]", "grid grid-cols-5")}>
          {diceValues.map((die) => (
            <Die key={die.id} content={die} onClick={handleHoldDice} />
          ))}
        </div>
        <Button ref={buttonRef} onClick={handleRollDice}>
          {gameWon ? <PartyPopper /> : <DicesIcon />}
          {gameWon ? "New Game" : "Roll"}
        </Button>
      </div>
    </main>
  );
}