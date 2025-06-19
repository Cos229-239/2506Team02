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
}