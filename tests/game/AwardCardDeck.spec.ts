import { AwardCardDeck } from "../../src/game/AwardCardDeck"

describe("Award card deck", () => {
    it("has the correct amount of cards in the default deck", () => {
        expect(AwardCardDeck.createDefault().size()).toBe(30)
    })
})
