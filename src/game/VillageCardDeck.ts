import { Deck } from "./Deck"
import { VillageCard } from "./cards/VillageCard"

/**
 * Represents a deck of village cards.
 */
export class VillageCardDeck extends Deck<VillageCard> {
    /**
     * Returns the default deck of all village cards.
     */
    static createDefault() {
        let cards = [
            new VillageCard("Hither Saxcote"),
            new VillageCard("Lower Aynesmore"),
            new VillageCard("Market Foxby"),
            new VillageCard("Middle Didsbrook"),
            new VillageCard("Newton Poemoor"),
        ]

        return new VillageCardDeck(cards)
    }
}
