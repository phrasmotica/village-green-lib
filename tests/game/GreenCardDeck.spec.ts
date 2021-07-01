import { GreenCardDeck } from "../../src/game/GreenCardDeck"

describe("Green card deck", () => {
    it("has the correct amount of cards in the default deck", () => {
        expect(GreenCardDeck.createDefault().size()).toBe(60)
    })
})
