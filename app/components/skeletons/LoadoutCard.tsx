interface LoadoutCardSkeletonProps {
  handleGenerateLoadout: () => void; // Function to trigger generation
  isLoading: boolean; // Loading state indicator
}

const LoadoutCardSkeleton = ({ handleGenerateLoadout, isLoading }: LoadoutCardSkeletonProps) => {
  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Placeholder for Primary Weapon */}
        <WeaponCardSkeleton title="Primary Weapon" />
        {/* Placeholder for Secondary Weapon */}
        <WeaponCardSkeleton title="Secondary Weapon" />
      </div>

      {/* Placeholder for Perks */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Perks</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 h-10 rounded"></div>
          ))}
        </div>
      </div>

      {/* Placeholder for Items */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Tactical</h4>
          <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded"></div>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Lethal</h4>
          <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded"></div>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Field Upgrade</h4>
          <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded"></div>
        </div>
      </div>

       {/* Generate Button */}
       <div className="flex justify-center mt-8">
         <button
           onClick={handleGenerateLoadout}
           disabled={isLoading} // Disable button while loading
           className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out ${
             isLoading
               ? "bg-gray-500 cursor-not-allowed"
               : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-md hover:shadow-lg transform hover:-translate-y-1"
           }`}
         >
           {isLoading ? "Generating..." : "Generate Random Loadout"}
         </button>
       </div>
    </div>
  );
};


// Simple skeleton for weapon card part
const WeaponCardSkeleton = ({ title }: { title: string }) => (
  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{title}</h3>
    <div className="h-24 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div> {/* Image Placeholder */}
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div> {/* Name Placeholder */}
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div> {/* Description Placeholder */}
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mt-1"></div> {/* Description Placeholder */}
  </div>
);


export default LoadoutCardSkeleton;