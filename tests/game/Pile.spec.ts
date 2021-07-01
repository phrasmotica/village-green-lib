import { Feature } from "../../src/game/cards/Feature"
import { Pile } from "../../src/game/Pile"
import { Tree } from "../../src/game/cards/Tree"
import { featureCard, lawnCard, treeCard } from "../Util"

describe("Pile", () => {
    it("allows a card to be played when no cards are present", () => {
        // arrange
        let pile = new Pile([])

        // act
        let success = pile.push(featureCard(Feature.Structure))

        // assert
        expect(success).toBe(true)
    })

    it("allows a card to be played when a lawn card is present", () => {
        // arrange
        let pile = new Pile([lawnCard()])

        // act
        let success = pile.push(featureCard(Feature.Structure))

        // assert
        expect(success).toBe(true)
    })

    let topCards = [
        featureCard(Feature.Structure),
        featureCard(Feature.Pond),
        treeCard([]),
        treeCard([Tree.Birch]),
        treeCard([Tree.Oak, Tree.Willow]),
    ]

    topCards.forEach(c => {
        it("prevents a card from being played when a non-lawn card is on top", () => {
            // arrange
            let pile = new Pile([c])

            // act
            let success = pile.push(featureCard(Feature.Structure))

            // assert
            expect(success).toBe(false)
        })
    })

    it("returns the top card correctly", () => {
        // arrange
        let card1 = lawnCard()
        let card2 = treeCard([Tree.Birch])

        let pile = new Pile([card1, card2])

        // act and assert
        expect(pile.topCard()).toBe(card2)
    })

    it("returns the top card as null when no cards are present", () => {
        // arrange
        let pile = new Pile([])

        // act and assert
        expect(pile.topCard()).toBeNull()
    })

    it("can be cleared", () => {
        // arrange
        let pile = new Pile([lawnCard()])

        // act
        pile.clear()

        // assert
        expect(pile.isEmpty()).toBe(true)
    })
})
