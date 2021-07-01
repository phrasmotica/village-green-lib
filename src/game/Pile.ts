import { GreenCard } from "./cards/GreenCard"

/**
 * Represents a pile of cards.
 */
export class Pile {
    constructor(
        public cards: GreenCard[],
    ) { }

    /**
     * Adds a green card to the pile, if possible.
     */
    push(card: GreenCard) {
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
     * Returns whether the given green card can be played on this pile.
     */
    canBePlayed(card: GreenCard) {
        return this.isEmpty() || this.topCard()!.hasLawn()
    }
}
