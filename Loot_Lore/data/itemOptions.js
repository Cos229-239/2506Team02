// data/itemOptions.js

export const itemType = [
  { value: 'Weapon' },
  { value: 'Armor' },
  { value: 'Shield' },
  { value: 'Potion' },
  { value: 'Ring' },
  { value: 'Wand' },
  { value: 'Rod' },
  { value: 'Staff' },
  { value: 'Scroll' },
  { value: 'Wondrous Item' },
  { value: 'Ammunition' },
  { value: 'Tool' },
  { value: 'Instrument' },
  { value: 'Clothing' },
  { value: 'Talisman' },
  { value: 'Gem' },
  { value: 'Container' },
  { value: 'Food' },
  { value: 'Drink' },
  { value: 'Key' },
  { value: 'Map' },
  { value: 'Treasure' },
  { value: 'Book' },
  { value: 'Relic' },
  { value: 'Material Component' },
];

export const magicItem = [
  { value: 'Yes' },
  { value: 'No' },
  { value: 'Yes with Attunement' },
];

export const damageType = [
  { value: 'Acid' },
  { value: 'Arcane' },
  { value: 'Astral' },
  { value: 'Bludgeoning' },
  { value: 'Cold' },
  { value: 'Divine' },
  { value: 'Fire' },
  { value: 'Force' },
  { value: 'Healing' },
  { value: 'Lightning' },
  { value: 'Necrotic' },
  { value: 'Piercing' },
  { value: 'Poison' },
  { value: 'Psychic' },
  { value: 'Radiant' },
  { value: 'Shadow' },
  { value: 'Slashing' },
  { value: 'Thunder' },
];

export const damageAmount = [
  { value: '1d4' },
  { value: '1d6' },
  { value: '1d8' },
  { value: '1d10' },
  { value: '1d12' },
  { value: '2d6' },
  { value: '2d8' },
  { value: '2d10' },
  { value: '3d6' },
  { value: '3d10' },
  { value: '3d8' },
  { value: '4d6' },
  { value: '5d6' },
  { value: '4d8' },
  { value: '5d10' },
  { value: '6d12' },
];

export const properties = [
   { value: 'Ammunition' },
  { value: 'Finesse' },
  { value: 'Heavy' },
  { value: 'Light' },
  { value: 'Loading' },
  { value: 'Reach' },
  { value: 'Special' },
  { value: 'Thrown' },
  { value: 'Two-Handed' },
  { value: 'Versatile' },
  { value: 'Silvered' },         // Not a core property but often relevant
  { value: 'Magical' },          // Custom/common tag used in gameplay
  { value: 'Improvised' },       // Optional category for makeshift weapons
];

const itemOptions = {
  itemType,
  magicItem,
  damageType,
  damageAmount,
  properties,
};

export default itemOptions;