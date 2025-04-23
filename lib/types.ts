export interface Weapon {
    name: string;
    imageUrl: string;
    attachments?: Attachment[]; // Keep if you plan to add attachment logic
    description?: string;
}

export interface Attachment {
    name: string;
    // Define specific attachment types based on your data/game
    type: "Muzzle" | "Barrel" | "Underbarrel" | "Optic" | "Stock" | "Rear Grip" | "Fire Mods" | "Laser" | "Magazine"
}

// Define the Perk type based on expected structure from perks.json
// If perks.json only has names, simplify this. If it has more fields, add them.
export type Perk = {
    name: string; // Assuming name is the primary identifier
    // Add other properties like imageUrl, description if they exist in perks.json
    imageUrl?: string;
    description?: string;
};

export interface Loadout {
    primaryWeapon: Weapon;
    secondaryWeapon: Weapon;
    perks: Perk[]; // Use the Perk type
    tactical: {
        name: string; // Example: "Stim Shot" | "Flash Grenade" | ... | ""
        imageUrl: string; // URL to the image of the tactical item
    };
    lethal: {
        name: string; // Example: "Thermite" | "C4" | ... | ""
        imageUrl: string; // URL to the image of the lethal item
    };  
    fieldUpgrade: string; // Example: "Heartbeat Sensor" | "Trophy System" | ... | ""
}