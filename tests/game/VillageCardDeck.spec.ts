import { VillageCardDeck } from "../../src/game/VillageCardDeck"

describe("Village card deck", () => {
    it("has the correct amount of cards in the default deck", () => {
        expect(VillageCardDeck.createDefault().size()).toBe(5)
    })
})
