export interface Weapon {
    name: string;
    imageUrl: string;
    attachments?: Attachment[];
    description?: string;
}

export interface Attachment {
    name: string;
    type: "Muzzle" | "Barrel" | "Underbarrel" | "Optic" | "Stock" | "Rear Grip" | "Ammunition" | "Laser" | "Magazine";
}

export interface Loadout {
    primaryWeapon: Weapon;
    secondaryWeapon: Weapon;
    perks: string[];
    tactical: "Stim Shot" | "Flash Grenade" | "Smoke Grenade" | "Thermite" | "Decoy Grenade" | "Stun Grenade" | "Gas Grenade";
    lethal: "Throwing Knife" | "C4" | "Claymore" | "Semtex" | "Proximity Mine" | "Molotov Cocktail" | "Thermite";
    fieldUpgrade: "Dead Silence" | "Trophy System" | "Battle Rage" | "Munitions Box" | "Tactical Insertion" | "Portable Radar" | "Smoke Airdrop";
}