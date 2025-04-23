import { Loadout } from "@/lib/types";

export const featuredLoadouts: Loadout[] = [
    {
      primaryWeapon: {
        name: "AK-74",
        imageUrl: "https://assets.codmunity.gg/optimized/ak-74-Dark-Spine.webp",
        description:
          "The AK-74 is a versatile assault rifle with a balanced performance.",
        attachments: [
          { name: "Monolithic Suppressor", type: "Muzzle" },
          { name: "Stock M16 Grenadier", type: "Barrel" },
          { name: "VLK 3.0x Optic", type: "Optic" },
          { name: "Commando Foregrip", type: "Underbarrel" },
          { name: "60  Round Mags", type: "Magazine" },
        ],
      },
      secondaryWeapon: {
        name: "Cigma 2B",
        imageUrl: "https://assets.codmunity.gg/optimized/CIGMA-2B-Dark-Spine.webp",
        description:
          "The Cigma 2B is a powerful rocket launcher, perfect for taking out vehicles.",
      },
      perks: ["Mountaineer", "Tracker", "Tempered"],
      lethal: "Thermite",
      tactical: "Stim Shot",
      fieldUpgrade: "Dead Silence",
    },
    {
      primaryWeapon: {
        name: "CR-56 Amax",
        imageUrl: "https://assets.codmunity.gg/optimized/CR-56-Amax.webp",
        description:
          "The Amax dominates long-range with fast TTK and decent recoil",
        attachments: [
          { name: "Compensator", type: "Muzzle" },
          { name: "Gain-Twist Barrel", type: "Barrel" },
          { name: "Volzhskiy Reflex", type: "Optic" },
          { name: "Vertical Foregrip", type: "Underbarrel" },
          { name: "Extended Mag II", type: "Magazine" },
        ],
      },
      secondaryWeapon: {
        name: "Saug",
        imageUrl: "https://assets.codmunity.gg/optimized/SAUG.webp",
        description:
          "The Saug is fun. Its average TTK is consistent and forgiving. Mobility is also great.",
        attachments: [
          { name: "Compensator", type: "Muzzle" },
          { name: "Long Barrel", type: "Barrel" },
          { name: "Balanced Stock", type: "Stock" },
          { name: "Vertical Foregrip", type: "Underbarrel" },
          { name: "Extended Mag II", type: "Magazine" },
        ],
      },
      perks: ["Survivor", "Quick Fix", "Ghost"],
      lethal: "Throwing Knife",
      tactical: "Stim Shot",
      fieldUpgrade: "Dead Silence",
    },
  ];