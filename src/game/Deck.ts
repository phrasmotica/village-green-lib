import { Card } from "./cards/Card"
import { Random } from "../util/Random"

/**
 * Represents the deck.
 */
export abstract class Deck<TCard extends Card> {
    /**
     * Creates a new deck.
     */
    constructor(
        private cards: TCard[]
    ) { }

    /**
     * Returns the size of the deck.
     */
    size() {
        return this.cards.length
    }

    /**
     * Returns whether the deck is empty.
     */
    isEmpty() {
        return this.size() === 0
    }

    /**
     * Draws the given number of cards from the deck.
     */
    draw(count: number) {
        let draws = []

        for (let i = 0; i < count; i++) {
            draws.push(this.drawOne())
        }

        return draws
    }

    /**
     * Draws one card from the deck.
     */
    drawOne() {
        let index = Random.index(this.cards.length)
        let choice = this.cards[index]
        this.cards.splice(index, 1)
        return choice
    }

    /**
     * Adds the given cards to the deck.
     */
    addCards(cards: TCard[]) {
        this.cards.push(...cards)
    }

    /**
     * Shuffles the deck.
     */
    shuffle() {
        Random.shuffleArray(this.cards)
    }
}
