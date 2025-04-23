"use client";
import LoadoutCardSkeleton from "../components/skeletons/LoadoutCard";
import { useState} from "react";
import { Loadout } from "@/lib/types";
import { fetchData } from "@/lib/backend/main";

const RandomPage = () => {
  const [generating, setGenerating] = useState<{
    primary: boolean;
    secondary: boolean;
    loadout: boolean;
  }>({
    primary: false,
    secondary: false,
    loadout: false,
  })


  const [loadout, setLoadout] = useState<Loadout | null>(null);

  const handleGenerateLoadout = async() => {
    await fetchData("XM4");
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between max-w-5xl mx-auto p-4">
        <header className="w-full bg-gray-100/70 dark:bg-black backdrop-blur-sm rounded-lg shadow-lg p-8 my-6 border-gray-200 dark:border-gray-800 border">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="flex flex-col items-center justify-center">
              <span className="text-6xl md:text-7xl tracking-wide font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
                Warzone
              </span>
              <span className="text-3xl md:text-4xl font-bold dark:text-slate-300 text-gray-900">
                Loadout Generator
              </span>
            </h1>
            <p className="text-lg text-center mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
              Try our amazing Warzone Loadout random generator! You'll get
              random weapons but the best loadouts for it! This random generator
              is unique on the market. Have fun!
            </p>
          </div>
        </header>

        <article>
            <LoadoutCardSkeleton generating={generating} setGenerating={setGenerating} handleGenerateLoadout={handleGenerateLoadout}/>
        </article>
      </main>
    </>
  );
};

export default RandomPage;
