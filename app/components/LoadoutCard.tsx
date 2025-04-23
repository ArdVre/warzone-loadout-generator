import { Loadout } from "@/lib/types";
import WeaponCard from "@/app/components/WeaponCard";
import Image from "next/image";

interface LoadoutCardProps {
  loadout: Loadout;
  className?: string;
  onRegenerate?: () => void;
}

const LoadoutCard = ({ loadout, className = "", onRegenerate }: LoadoutCardProps) => {
  return (
    <section className={`flex flex-col gap-4 p-4 bg-white dark:bg-black/90 rounded-lg border w-full border-gray-200 dark:border-gray-800 ${className}`}>
      {/* Weapons - Horizontal Layout */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Primary</span>
          </div>
          <WeaponCard weapon={loadout.primaryWeapon} />
        </div>
        
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Secondary</span>
          </div>
          <WeaponCard weapon={loadout.secondaryWeapon} />
        </div>
      </div>
      
      {/* Additional Loadout Details */}
      <div className="mt-8 pt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Perks */}
        <div>
          <h4 className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">Perks</h4>
          <div className="flex flex-wrap gap-1">
            {loadout.perks.map((perk, index) => (
              <div key={index} className={`flex items-center gap-2 px-2 py-1 rounded-md border border-blue-100 dark:border-gray-700 ${index === 0 && "bg-blue-700 dark:bg-blue-800"} ${index === 1 && "bg-red-700 dark:bg-red-800"} ${index === 2 && "bg-yellow-700 dark:bg-yellow-800"}`}>
              <div className="w-6 h-6 relative flex-shrink-0">
                <Image 
                src={perk.imageUrl as string} 
                alt={perk.name} 
                fill
                className="object-cover"
                />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{perk.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tactical & Lethal */}
        <div>
          <h4 className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">Equipment</h4>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Tactical:</span>
              {loadout.tactical.imageUrl && (
                <div className="w-4 h-4 relative flex-shrink-0">
                  <Image 
                    src={loadout.tactical.imageUrl} 
                    alt={loadout.tactical.name} 
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-xs text-gray-700 dark:text-gray-300">{loadout.tactical.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Lethal:</span>
              {loadout.lethal.imageUrl && (
                <div className="w-4 h-4 relative flex-shrink-0">
                  <Image 
                    src={loadout.lethal.imageUrl} 
                    alt={loadout.lethal.name} 
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-xs text-gray-700 dark:text-gray-300">{loadout.lethal.name}</span>
            </div>
          </div>
        </div>
        
        {/* Field Upgrade */}
        <div>
          <h4 className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">Field Upgrade</h4>
          <span className="px-2 py-0.5 bg-blue-400 dark:bg-gray-800 text-xs rounded text-gray-700 dark:text-gray-300">
            {loadout.fieldUpgrade}
          </span>
        </div>
      </div>

      {/* Regenerate Button */}
      {onRegenerate && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onRegenerate}
            className="cursor-pointer px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Generate Another
          </button>
        </div>
      )}
    </section>
  );
};

export default LoadoutCard;