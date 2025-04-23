
interface LoadoutCardSkeletonProps {
  className?: string;
  generating: {
    primary: boolean;
    secondary: boolean;
    loadout: boolean;
  }
  setGenerating: (generating: { primary: boolean; secondary: boolean; loadout: boolean }) => void;
  handleGenerateLoadout: () => void;
};

const LoadoutCardSkeleton = ({ className = "", generating, setGenerating, handleGenerateLoadout }: LoadoutCardSkeletonProps) => {
    const hoverTransform: string = "hover:-translate-y-1 transition-transform translate duration-200 ease-in-out cursor-pointer";

    const handleGenerate = (type: "primary" | "secondary" | "loadout") => {
      if (type === "primary") {
        setGenerating({ ...generating, primary: true });
        handleGenerateLoadout();
      } else if (type === "secondary") {
        setGenerating({ ...generating, secondary: true });
        handleGenerateLoadout();
      } else if (type === "loadout") {
        setGenerating({ ...generating, loadout: true });
        handleGenerateLoadout();
      }
    };

    return (
      <section className={`flex flex-col gap-4 p-4 bg-white dark:bg-black/90 rounded-lg border w-full border-gray-200 dark:border-gray-800 ${className}`}>
        {/* Weapons Skeleton */}
        <div className="flex flex-col md:flex-row gap-4">
          {[1, 2].map((_, idx) => (
            <div className="flex-1" key={idx}>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-gray-800 dark:text-gray-400">{idx === 0 ? "Primary" : "Secondary"}</h3>
              </div>
              <div className="h-[300px] bg-gray-200 dark:bg-gray-800 rounded-lg" />
              <button className={`bg-gradient-to-r from-blue-600 to-blue-300 px-6 py-1 mt-6 rounded-md text-white font-medium w-full ${hoverTransform}`} onClick={() => handleGenerate(idx === 0 ? "primary" : "secondary")}>
                {generating[idx === 0 ? "primary" : "secondary"] ? `Generating ${idx === 0 ? "primary" : "secondary"}...` : `Generate ${idx === 0 ? "Primary" : "Secondary"}`}
              </button>
            </div>
          ))}
        </div>
  
        {/* Details Skeleton */}
        <div className="mt-8 pt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Perks */}
          <div>
            <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
            <div className="flex flex-wrap gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
              ))}
            </div>
          </div>
  
          {/* Equipment */}
          <div className="space-y-2">
            <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
            {[1, 2].map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="h-3 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
  
          {/* Field Upgrade */}
          <div>
            <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
        <button className={`border border-gray-200 mb-2 dark:border-gray-800 px-6 py-1 mt-6 rounded-md dark:text-gray-300 text-gray-6 00 font-medium w-full ${hoverTransform}`} onClick={() => handleGenerate("loadout")}>
          {generating.loadout ? "Generating Loadout..." : "Generate Loadout"}
        </button>
      </section>
    );
  };
  
  export default LoadoutCardSkeleton;
  