import { Card } from "./cards/Card"
import { Colour } from "./cards/Colour"
import { Flower } from "./cards/Flower"
import { FeatureCard } from "./cards/FeatureCard"
import { Feature } from "./cards/Feature"
import { Random } from "../util/Random"

/**
 * Represents the deck.
 */
export class Deck {
    /**
     * Creates a new deck.
     */
    constructor(
        private cards: Card[]
    ) { }

    /**
     * Creates a deck for the game.
     */
    static create() {
        let cards = []

        for (let i = 0; i < 10; i++) {
            cards.push(new FeatureCard(Colour.Red, Flower.Rose, Feature.Structure))
        }

        return new Deck(cards)
    }

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
    addCards(cards: Card[]) {
        this.cards.push(...cards)
    }

    /**
     * Shuffles the deck.
     */
    shuffle() {
        Random.shuffleArray(this.cards)
    }
}
