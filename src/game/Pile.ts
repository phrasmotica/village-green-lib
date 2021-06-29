import { Card } from "./Card"
import { Feature } from "./Feature"

/**
 * Represents a pile of cards.
 */
export class Pile {
    constructor(
        public cards: Card[],
    ) { }

    /**
     * Adds a card to the pile, if possible.
     */
    push(card: Card) {
        if (this.canBePlayed(card)) {
            this.cards.push(card)
            return true
        }

        return false
    }

    isEmpty() {
        return this.cards.length <= 0
    }

    /**
     * Returns the card on the top of the pile.
     */
    topCard() {
        if (this.isEmpty()) {
            return null
        }

        return this.cards[this.cards.length - 1]!
    }

    /**
     * Returns whether the given card can be played on this pile.
     */
    canBePlayed(card: Card) {
        return this.isEmpty() || this.topCard()!.getFeatures().includes(Feature.Lawn)
    }
}
