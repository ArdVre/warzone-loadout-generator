import Image from "next/image";
import type { Weapon, Attachment } from "@/lib/types";

interface WeaponCardProps {
  weapon: Weapon;
}

const WeaponCard = ({ weapon }: WeaponCardProps) => {
  // Group attachments by type for better organization
  const groupedAttachments: Record<string, Attachment[]> = {};

  weapon.attachments?.forEach((attachment) => {
    if (!groupedAttachments[attachment.type]) {
      groupedAttachments[attachment.type] = [];
    }
    groupedAttachments[attachment.type].push(attachment);
  });

  return (
    <div className="flex flex-col bg-white dark:bg-background-alt rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden h-full shadow-md">
      {/* Image container */}
      <div className="relative w-full aspect-w-16 aspect-h-9 p-8">
        <Image
          src={weapon.imageUrl}
          alt={weapon.name}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded-t-lg"
        />
      </div>

      {/* Content container */}
      <div className="flex-grow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {weapon.name}
        </h2>
        
        {weapon.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {weapon.description}
          </p>
        )}
      </div>

      {/* Attachments section */}
      {weapon.attachments && weapon.attachments.length > 0 && (
        <div className="px-6 pb-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-4">
            {Object.entries(groupedAttachments).map(([type, attachments]) => (
              <div key={type} className="w-full">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {type}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {attachments.map((attachment, index) => (
                    <span key={index} className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="h-2 w-2 rounded-full bg-blue-400 dark:bg-blue-600 mr-2"></span>
                      <span className="text-gray-700 dark:text-gray-300">{attachment.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeaponCard;
