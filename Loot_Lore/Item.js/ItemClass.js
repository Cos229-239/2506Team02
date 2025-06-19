export class Item {
    constructor({
        name,
        type,
        rarity,
        stats,
        description,
        lore,
    }) {
        this.name = name;
        this.type = type;
        this.rarity = rarity;
        this.stats = stats;
        this.description = description;
        this.lore = lore;
    }

    displayItemData() {
         return `
        Name: ${this.name}
        Type: ${this.type}
        Rarity: ${this.rarity}
        Stats: ${JSON.stringify(this.stats, null, 2)}
        Description: ${this.description}
        Lore: ${this.lore}
      `;
    }
}