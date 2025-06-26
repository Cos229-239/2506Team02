// prompts.js

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
- If helpful, blend syllables or phrases (e.g., “Vraelor”, “Nyssith”, “Karnithul”).
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

//  CHARACTER PROMPT
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

// SPELL PROMPT
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