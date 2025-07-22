// prompts.js

// MONSTER CREATION PROMPT
export const MONSTER_CREATION_PROMPT = `
You are an AI assistant that generates **unique** fantasy RPG monsters. Respond ONLY with a valid JSON object matching the following schema:

{
  "name": "string",
  "type": "string",
  "challengeRating": "string (e.g., '3', '5', '10')",
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

**Instructions:**

- Invent a **fully original name** that feels authentic in a fantasy setting. It should evoke the monster’s role, nature, or environment.
- Use **invented words**, compound roots, or phonetic blends from real-world ancient, mythic, or arcane-sounding languages (e.g., Latin, Norse, Sumerian, Sanskrit).
- Avoid using existing names from popular games or mythology (e.g., "Dragon", "Goblin", "Demon", "Orc", etc.).
- The name should be **memorable, thematically aligned**, and **not resemble generic creatures**.

**shortDescription**:
- 1-2 paragraphs describing appearance, movement, sounds, smell, aura, and presence.
- It should be **cinematic and evocative**, as if being narrated.

**lore**:
- 1-2 paragraphs of backstory.
- Include origin, magical nature, role in ecosystems or pantheons, myths, combat behavior, and how adventurers might hear of it.
- Use a **mythic and immersive tone**.

**Formatting Requirements**:
- Return ONLY the JSON object.
- Use plain double quotes throughout — no markdown or extra formatting.
- Do NOT include preamble, commentary, or notes before or after the JSON.
`;

// CHARACTER CREATION PROMPT
export const CHARACTER_CREATION_PROMPT = `
Create a fantasy RPG character with the following traits:

- Race: \${character.race}
- Class: \${character.class}
- Level: \${levelNumber}
- Background: \${character.background}
- Alignment: \${character.alignment}

Instructions:
- Focus on creating a **unique** personality and character concept.
- Traits must include physical abilities, class-related skills, background flavor, and roleplay quirks.
- Traits should reflect a mix of race/class abilities, training, and life experience (e.g., a Barbarian might have 'Berserker Rage', while a Sage has 'Arcane Recall').

Stat Generation:
- Randomize stats (1-25) using the 3d6 or 4d6 drop-low method.
- Stats should loosely align with the character's class — e.g., Fighters tend to have higher STR/CON, Wizards higher INT, etc.

Respond ONLY with valid JSON in this structure:

{
  "name": "Character Name",
  "personality": "Short paragraph describing temperament, ideals, flaws...",
  "backstory": "1-2 paragraph backstory that includes origin, upbringing, and how they became an adventurer.",
  "traits": [
    "Trait 1",
    "Trait 2",
    "Trait 3"
  ],
  "stats": {
    "Strength": number,
    "Dexterity": number,
    "Constitution": number,
    "Intelligence": number,
    "Wisdom": number,
    "Charisma": number
  }
}

Return ONLY valid JSON. Do not include any commentary, markdown, or formatting outside the object.
`;

// ITEM CREATION PROMPT
export const ITEM_CREATION_PROMPT = `
You are an AI item crafter creating **unique** fantasy RPG items. Given the input parameters, return ONLY a valid JSON object in this format:

{
  "name": "Item Name",
  "description": "A vivid, immersive item description (1-2 paragraphs)...",
  "damage": {
    "amount": "\${item.damageAmount}",
    "type": "\${item.damageType}"
  },
  "properties": [
    "\${item.properties}"
  ],
  "effect": [
    "Primary effect (e.g., 'Grants the user +2 Strength for 1 hour')",
    "Secondary effect (e.g., 'On wearer's death, item turns to dust')",
    "Quirk or drawback (e.g., 'Glows faintly in darkness and attracts enemies')"
  ],
  "origin": "1-2 paragraphs describing the item's history, origin, how it was created, its role in the world, and any famous events or legends surrounding it.",
  "type": "\${item.itemType}",
  "magicItem": "\${item.magicItem}"
}

Instructions:
- Invent an **original** and **creative** item name that evokes its purpose, history, or the lore surrounding it.
- The description should include the item’s aesthetic, its look and feel, and how it fits in the fantasy world (e.g., glowing swords, cursed rings, enchanted armor).
- The damage should align with the item type and follow D&D 5e rules or similar systems for balanced gameplay.
- Properties should include any unique or legendary attributes that make the item stand out.
- Provide a **lore section** that describes the origin and magical nature of the item, its history, how adventurers might find it, and the role it plays in the world.
- Avoid using well-known names or items from popular games and franchises.
- Ensure that the item is consistent with the provided parameters, particularly the damage amount and type, the properties selected, and the item’s magical nature.
- Return ONLY the JSON object without any extra commentary, markdown, or explanations.
`;

// SPELL CREATION PROMPT
export const SPELL_CREATION_PROMPT = `
You are an AI spellcrafter creating **unique** fantasy RPG spells. Given the input parameters, return ONLY a valid JSON object in this format:

{
  "name": "Spell Name",
  "description": "A vivid, immersive spell description (1-2 paragraphs)...",
  "effects": [
    "Primary magical effect (e.g., 'Deals 6d8 fire damage in a 20 ft cone')",
    "Secondary condition (e.g., 'On fail, target is knocked prone')",
    "Quirk or drawback (e.g., 'Caster glows and takes double radiant damage for 1 turn')"
  ],
  "components": {
    "verbal": true,
    "somatic": true,
    "material": "a ruby worth 50gp"
  },
  "school": "\${spell.spellType}",
  "level": \${levelNumber},
  "castingTime": "\${spell.castingTime}",
  "duration": "\${spell.duration}",
  "range": "\${spell.rangeArea}"
}

Instructions:
- Invent a spell that fits the given **school**, **level**, and casting parameters.
- Avoid copying any known D&D or Pathfinder spells.
- Be flavorful and cinematic in how the spell looks, sounds, or feels.
- Effects must include a **benefit**, a **status effect or mechanic**, and a **quirk or drawback**.
- Ensure JSON is properly escaped and valid. Do not return markdown, extra notes, or explanations.
`;
