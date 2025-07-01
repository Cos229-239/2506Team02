//Prompt that goes to ChatGPT
export const MONSTER_CREATION_PROMPT = `
You are an AI that returns JSON representing an RPG monster. Given a description, respond ONLY with a valid JSON object that matches the following structure:

{
  "name": "string",
  "type": "string",
  "challengeRating": "string",
  "stats": {
    "STR": number,
    "DEX": number,
    "CON": number,
    "INT": number,
    "WIS": number,
    "CHA": number
  },
  "abilities": ["string"],
  "attacks": ["string"],
  "spells": ["string"],
  "lore": "string",
  "shortDescription": "string"
}
  
Requirements:
- The "shortDescription" must be a rich, vivid paragraph of **at least 200 words**. Describe the creature's appearance, movement, sounds, smells, and emotional impact on those who see it.
- The "lore" must be a detailed narrative of **at least 300 words**, including the monster’s origin, mythological or magical context, ecological role, cultural significance, known encounters, and any legends or rumors about it.
- DO NOT include markdown, comments, or any text outside of the JSON object.
- Make sure the JSON is **valid** and fully filled out.

Respond with **only the JSON object** and nothing else.
`;

export const ITEM_PROMPT = `
You are an AI that returns JSON representing an RPG-style item. Given a description, respond ONLY with a valid JSON object that matches the following structure:
{
  "name": "Item Name",
  "description": "A vivid, immersive item description (1-2 paragraphs)...",
  
  "Item": "\${item.itemType}",
  "MagicItem": \${MagicItem},
  "damageType": "\${item.damageType}",
  "damage": "\${item.damage}",
  "properties": "\${item.properties}"
}

Requirements:
- The "description" must be a vivid and engaging paragraph of **at least 200 words**. Describe the item's appearance, magical properties, and any unique features that set it apart from ordinary items.
- The "lore" must be a detailed narrative of **at least 300 words**, including the item's origin, historical significance, notable owners, and any legends or myths associated with it.
- DO NOT include markdown, comments, or any text outside of the JSON object.
- Make sure the JSON is **valid** and fully filled out.

Respond with **only the JSON object** and nothing else.`;
