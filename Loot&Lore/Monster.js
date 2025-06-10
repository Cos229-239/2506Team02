//Monster class
export class Monster {
  constructor({
    name,
    type,
    challengeRating,
    stats,
    abilities,
    attacks,
    spells,
    lore,
    shortDescription,
  }) {
    this.name = name;
    this.type = type;
    this.challengeRating = challengeRating;
    this.stats = stats;
    this.abilities = abilities;
    this.attacks = attacks;
    this.spells = spells;
    this.lore = lore;
    this.shortDescription = shortDescription;
  }
}
