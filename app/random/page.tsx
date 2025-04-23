"use client";
import LoadoutCardSkeleton from "../components/skeletons/LoadoutCard";
import { useState, useCallback, useEffect } from "react";
import { Loadout, Weapon, Perk } from "@/lib/types"; // Assuming Perk type exists or needs creation in types.ts
import LoadoutCard from "../components/LoadoutCard";

// Define types for fetched data
type WeaponData = Record<string, Weapon[]>;
type PerkData = { perks: Record<string, Perk[]> }; // Adjusted based on perks.json structure
type ItemData = {
  tactical: Loadout['tactical'][]; // Use the object type from Loadout
  lethal: Loadout['lethal'][]; // Use the object type from Loadout
  fieldUpgrade: { name: Loadout['fieldUpgrade'] }[];
};

// --- Helper Functions ---

// Fetches data from a given URL
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${res.statusText}`);
  }
  return res.json();
}

// Selects a random element from an array
function getRandomElement<T>(arr: T[]): T | undefined {
  if (!arr || arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Gets a random weapon from a specific category or any category if not specified
function selectRandomWeapon(weaponData: WeaponData, excludedCategory?: string): { weapon: Weapon, category: string } | null {
  let availableCategories = Object.keys(weaponData);
  if (excludedCategory) {
    availableCategories = availableCategories.filter(cat => cat !== excludedCategory);
  }

  if (availableCategories.length === 0) return null; // No categories available

  const randomCategory = getRandomElement(availableCategories);
  if (!randomCategory) return null;

  const weaponsInCategory = weaponData[randomCategory];
  const randomWeapon = getRandomElement(weaponsInCategory);

  if (!randomWeapon) return null; // Should not happen if category has weapons

  // Return a simplified weapon object for the loadout
  return {
      weapon: {
          name: randomWeapon.name,
          imageUrl: randomWeapon.imageUrl,
          description: randomWeapon.description,
          attachments: [], // Attachments logic can be added later if needed
      },
      category: randomCategory
  };
}

// Gets random perks (one from each tier)
async function getRandomPerks(): Promise<Loadout["perks"]> {
  try {
    const data = await fetchData<PerkData>("/data/perks.json");
    const randomPerks: Loadout["perks"] = [];

    for (const tier of Object.keys(data.perks)) {
      const perksInTier = data.perks[tier];
      const randomPerk = getRandomElement(perksInTier);
      if (randomPerk) {
        // Ensure the pushed object matches the Perk type structure
        // If perks.json only contains names, adjust accordingly or update types.ts/perks.json
        randomPerks.push(randomPerk);
      }
    }
    // Ensure exactly 4 perks if required by game rules, might need adjustment
    return randomPerks.slice(0, 4); // Example: Limit to 4 perks
  } catch (error) {
    console.error("Error fetching or processing perk data:", error);
    return [];
  }
}

// Gets random tactical, lethal, and field upgrade items
async function getRandomItems(): Promise<{
  tactical: Loadout["tactical"];
  lethal: Loadout["lethal"];
  fieldUpgrade: Loadout["fieldUpgrade"];
}> {
  try {
    const data = await fetchData<ItemData>("/data/items.json");

    // Select the full object, provide default if not found
    const tactical = getRandomElement(data.tactical) ?? { name: "None", imageUrl: "" };
    const lethal = getRandomElement(data.lethal) ?? { name: "None", imageUrl: "" };
    const fieldUpgrade = getRandomElement(data.fieldUpgrade)?.name ?? "None"; // Field upgrade remains a string

    return { tactical, lethal, fieldUpgrade };
  } catch (error) {
    console.error("Error fetching or processing item data:", error);
    // Return default structure matching the Loadout type
    return { tactical: { name: "Error", imageUrl: "" }, lethal: { name: "Error", imageUrl: "" }, fieldUpgrade: "Error" };
  }
}


// --- Default Empty Weapon ---
const emptyWeapon: Weapon = {
  name: "",
  imageUrl: "",
  attachments: [],
  description: "",
};


// --- RandomPage Component ---

const RandomPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadout, setLoadout] = useState<Loadout | null>(null);
  const [error, setError] = useState<string | null>(null);


  const generateRandomLoadout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLoadout(null); // Clear previous loadout immediately

    try {
      // Fetch all data concurrently
      const [weaponJson, perks, items] = await Promise.all([
        fetchData<{ weapons: WeaponData }>("/data/weapons.json"),
        getRandomPerks(),
        getRandomItems(),
      ]);

      const weaponData = weaponJson.weapons;
      if (!weaponData || Object.keys(weaponData).length === 0) {
        throw new Error("No weapon data found.");
      }

      // Select Primary Weapon
      const primarySelection = selectRandomWeapon(weaponData);
      if (!primarySelection) {
        throw new Error("Failed to select a primary weapon.");
      }
      const primaryWeapon = primarySelection.weapon;
      const primaryCategory = primarySelection.category;

      // Select Secondary Weapon from a different category
      const secondarySelection = selectRandomWeapon(weaponData, primaryCategory);
      if (!secondarySelection) {
        // Fallback: If only one category exists or selection fails, allow same category (or handle differently)
        console.warn("Could not select secondary weapon from a different category. Allowing any category.");
        const fallbackSecondary = selectRandomWeapon(weaponData);
        if (!fallbackSecondary) throw new Error("Failed to select a secondary weapon.");
        setLoadout({
            primaryWeapon: primaryWeapon,
            secondaryWeapon: fallbackSecondary.weapon,
            perks: perks,
            tactical: items.tactical, // Pass the full object
            lethal: items.lethal,     // Pass the full object
            fieldUpgrade: items.fieldUpgrade,
        });
      } else {
          setLoadout({
            primaryWeapon: primaryWeapon,
            secondaryWeapon: secondarySelection.weapon,
            perks: perks,
            tactical: items.tactical, // Pass the full object
            lethal: items.lethal,     // Pass the full object
            fieldUpgrade: items.fieldUpgrade,
          });
      }

    } catch (err) {
      console.error("Failed to generate loadout:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      // Optionally clear parts of the loadout or set a default error state
       setLoadout({
           primaryWeapon: emptyWeapon,
           secondaryWeapon: emptyWeapon,
           perks: [],
           tactical: { name: "", imageUrl: "" }, // Use default object structure
           lethal: { name: "", imageUrl: "" },   // Use default object structure
           fieldUpgrade: "",
       });
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies needed if helper functions don't rely on component state/props

  // Initial loadout generation on component mount (optional)
  useEffect(() => {
    generateRandomLoadout();
  }, [generateRandomLoadout]);


  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between max-w-5xl mx-auto p-4">
        {/* Header remains the same */}
        <header className="w-full bg-gray-100/70 dark:bg-black backdrop-blur-sm rounded-lg shadow-lg p-8 my-6 border-gray-200 dark:border-gray-800 border">
          {/* ... header content ... */}
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
              Try our amazing Warzone Loadout random generator! You&apos;ll get
              random weapons but the best loadouts for it! This random generator
              is unique on the market. Have fun!
            </p>
          </div>
        </header>

        <article className="w-full flex justify-center">
          {/* Conditional Rendering based on loading and loadout state */}
          {isLoading || !loadout ? (
             <LoadoutCardSkeleton
               // Pass necessary props to the skeleton
               // The skeleton might need adjustments based on the new structure
               // For example, it might just show a loading state or a button to generate
               handleGenerateLoadout={generateRandomLoadout} // Pass the generation function
               isLoading={isLoading} // Let the skeleton know if it's loading
             />
          ) : error ? (
             <div className="text-red-500 text-center p-4 border border-red-500 rounded-lg bg-red-100 dark:bg-red-900/30">
                <p>Error generating loadout: {error}</p>
                <button
                    onClick={generateRandomLoadout}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
             </div>
          ) : (
            // Pass the generated loadout and potentially a regenerate function
            <LoadoutCard loadout={loadout} onRegenerate={generateRandomLoadout} />
          )}
        </article>
      </main>
    </>
  );
};

export default RandomPage;
