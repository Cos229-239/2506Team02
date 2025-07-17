// /data/savedDataOptions.js

export const savedDataLabels = [
  'Private Characters',
  'Private Monsters',
  'Private Items',
  'Private Spells',
  'Global Characters',
  'Global Monsters',
  'Global Items',
  'Global Spells',
];

export const savedDataOptions = savedDataLabels.map((label, index) => ({
  key: String(index + 1),
  value: label,
}));

export const savedDataRouteMap = Object.fromEntries(
  savedDataLabels.map((label) => [label, label])
);
