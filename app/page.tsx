import type { Loadout } from "@/lib/types";
import LoadoutCard from "@/app/components/LoadoutCard";
import Link from "next/link";
import { featuredLoadouts } from "@/lib/featured";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
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
            Try our amazing Warzone Loadout random generator! You'll get random
            weapons but the best loadouts for it! This random generator is
            unique on the market. Have fun!
          </p>
          <Link href="/random" className="group bg-gradient-to-r from-blue-600 to-blue-300 px-6 py-3 mt-6 rounded-md text-white font-medium hover:opacity-90 transition-opacity cursor-pointer">
            Generate Random Loadout 
            <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 translate transition-transform duration-100" />
          </Link>
        </div>
      </header>
      <article>
        <header className="w-full bg-gray-100/70 dark:bg-black backdrop-blur-sm rounded-lg shadow-lg p-8 my-6 border-gray-200 dark:border-gray-800 border">
          <h2 className="text-2xl text-gray-900 dark:text-gray-200/90">
            Featured Loadouts
          </h2>
        </header>
        <section className="w-full flex flex-col items-center justify-center gap-4">
          {featuredLoadouts.map((loadout) => (
            <LoadoutCard
              loadout={loadout}
              key={`${loadout.primaryWeapon.name}-${loadout.secondaryWeapon.name}`}
            />
          ))}
        </section>
      </article>
    </main>
  );
}
