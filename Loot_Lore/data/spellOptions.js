// data/spellOptions.js

export const spellType = [
  { value: 'abjuration' },
  { value: 'conjuration' },
  { value: 'divination' },
  { value: 'enchantment' },
  { value: 'evocation' },
  { value: 'illusion' },
  { value: 'necromancy' },
  { value: 'transmutation' },
];
  export const spellLevel = [
  { value: 'Level 1' },
  { value: 'Level 2' },
  { value: 'Level 3' },
  { value: 'Level 4' },
  { value: 'Level 5' },
  { value: 'Level 6' },
  { value: 'Level 7' },
  { value: 'Level 8' },
  { value: 'Level 9' },
];
  export const castingTime = [
  { value: '1 action' },
  { value: '1 bonus action' },
  { value: '1 reaction' },
  { value: '1 minute' },
  { value: '10 minutes' },
  { value: '1 hour' },
  { value: '8 hours' },
  { value: '12 hours' },
  { value: '24 hours' },
];
 export const duration = [
  { value: 'Instantaneous' },
  { value: 'Until dispelled' },
  { value: 'Concentration, up to 1 round' },
  { value: 'Concentration, up to 1 minute' },
  { value: 'Concentration, up to 10 minutes' },
  { value: 'Concentration, up to 1 hour' },
  { value: 'Concentration, up to 8 hours' },
  { value: '1 round' },
  { value: '1 minute' },
  { value: '10 minutes' },
  { value: '1 hour' },
  { value: '8 hours' },
  { value: '24 hours' },
  { value: '7 days' },
  { value: 'Special' },
];
export const rangeArea = [
  { value: 'Self' },
  { value: 'Touch' },
  { value: '5 feet' },
  { value: '10 feet' },
  { value: '15 feet' },
  { value: '30 feet' },
  { value: '60 feet' },
  { value: '90 feet' },
  { value: '120 feet' },
  { value: '150 feet' },
  { value: '300 feet' },
  { value: '500 feet' },
  { value: '1 mile' },
  { value: 'Sight' },
  { value: 'Unlimited' },
  { value: 'Special' },
  { value: 'Area: 5-foot radius' },
  { value: 'Area: 10-foot radius' },
  { value: 'Area: 15-foot cone' },
  { value: 'Area: 20-foot cube' },
  { value: 'Area: 60-foot line' },
  { value: 'Area: Sphere (varies)' },
  { value: 'Area: Cylinder (varies)' },
];

const spellOptions = {
  spellType,
  spellLevel,
  castingTime,
  duration,
  rangeArea,
};

export default spellOptions;