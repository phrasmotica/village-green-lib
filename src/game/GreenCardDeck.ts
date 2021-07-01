import { Deck } from "./Deck"
import { GreenCard } from "./cards/GreenCard"
import { LawnCard } from "./cards/LawnCard"
import { Flower } from "./cards/Flower"
import { Colour } from "./cards/Colour"
import { FeatureCard } from "./cards/FeatureCard"
import { Feature } from "./cards/Feature"
import { TreeCard } from "./cards/TreeCard"
import { Tree } from "./cards/Tree"

/**
 * Represents a deck of green cards.
 */
export class GreenCardDeck extends Deck<GreenCard> {
    /**
     * Returns the default deck of all green cards.
     */
    static createDefault() {
        let cards = []

        for (let i = 0; i < 6; i++) {
            // six lawn cards
            cards.push(new LawnCard())
        }

        for (let c of Object.values(Colour)) {
            for (let f of Object.values(Flower)) {
                // each flower and colour combination has one pond card...
                cards.push(new FeatureCard(c, f, Feature.Pond))

                // ...and two structure cards
                cards.push(new FeatureCard(c, f, Feature.Structure))
                cards.push(new FeatureCard(c, f, Feature.Structure))
            }

            // each colour of petunia has a single-tree card of each species
            cards.push(new TreeCard(c, Flower.Petunia, [Tree.Birch]))
            cards.push(new TreeCard(c, Flower.Petunia, [Tree.Oak]))
            cards.push(new TreeCard(c, Flower.Petunia, [Tree.Willow]))

            // each colour of rose has a double-tree card of each species
            cards.push(new TreeCard(c, Flower.Rose, [Tree.Birch, Tree.Birch]))
            cards.push(new TreeCard(c, Flower.Rose, [Tree.Oak, Tree.Oak]))
            cards.push(new TreeCard(c, Flower.Rose, [Tree.Willow, Tree.Willow]))

            // each colour of lily has a two-tree card of different species. Red
            // and yellow ones have (b,w), (w,o) and (o,b) while blue ones have
            // (b,o), (o,w) and (w,b)
            if (c === Colour.Blue) {
                cards.push(new TreeCard(c, Flower.Lily, [Tree.Birch, Tree.Oak]))
                cards.push(new TreeCard(c, Flower.Lily, [Tree.Oak, Tree.Willow]))
                cards.push(new TreeCard(c, Flower.Lily, [Tree.Willow, Tree.Birch]))
            }
            else {
                cards.push(new TreeCard(c, Flower.Lily, [Tree.Birch, Tree.Willow]))
                cards.push(new TreeCard(c, Flower.Lily, [Tree.Willow, Tree.Oak]))
                cards.push(new TreeCard(c, Flower.Lily, [Tree.Oak, Tree.Birch]))
            }
        }

        return new GreenCardDeck(cards)
    }
}
