// data/itemOptions.js

export const itemType = [
  { value: 'Weapon' },
  { value: 'Armor' },
  { value: 'Potion' },
  { value: 'Scroll' },
  { value: 'Ring' },
  { value: 'Amulet' },
  { value: 'Wand' },
];

export const magicItem = [
  { value: 'Yes' },
  { value: 'No' },
];

export const damageType = [
  { value: 'Bludgeoning' },
  { value: 'Slashing' },
  { value: 'Piercing' },
  { value: 'Fire' },
  { value: 'Cold' },
  { value: 'Lightning' },
  { value: 'Necrotic' },
  { value: 'Radiant' },
  { value: 'Psychic' },
  { value: 'Force' },
  { value: 'Acid' },
  { value: 'Poison' },
  { value: 'Healing' },
  { value: 'Arcane' },
  { value: 'Divine' },
  { value: 'Shadow' },
  { value: 'Astral' },
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
  { value: '3d8' },
  { value: '4d6' },
  { value: '4d8' },
  { value: '5d6' },
];

export const properties = [
  { value: 'Mythical' },
  { value: 'Cursed' },
  { value: 'Artifact' },
  { value: 'Unique' },
  { value: 'Legendary' },
];

const itemOptions = {
  itemType,
  magicItem,
  damageType,
  damageAmount,
  properties,
};

export default itemOptions;