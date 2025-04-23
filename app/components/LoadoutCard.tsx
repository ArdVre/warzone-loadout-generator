import { Loadout } from "@/lib/types";
import WeaponCard from "@/app/components/WeaponCard";

interface LoadoutCardProps {
  loadout: Loadout;
  className?: string;
}

const LoadoutCard = ({ loadout, className = "" }: LoadoutCardProps) => {
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
              <span key={index} className="px-2 py-0.5 bg-blue-400 dark:bg-gray-800 text-xs rounded text-gray-700 dark:text-gray-300">
                {perk}
              </span>
            ))}
          </div>
        </div>
        
        {/* Tactical & Lethal */}
        <div>
          <h4 className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">Equipment</h4>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Tactical:</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">{loadout.tactical}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Lethal:</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">{loadout.lethal}</span>
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
    </section>
  );
};

export default LoadoutCard;