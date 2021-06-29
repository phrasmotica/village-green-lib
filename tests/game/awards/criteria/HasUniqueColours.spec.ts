import { HasUniqueColours } from "../../../../src/game/awards/criteria/HasUniqueColours"
import { Colour } from "../../../../src/game/Colour"
import { Flower } from "../../../../src/game/Flower"
import { Pile } from "../../../../src/game/Pile"
import { cardWith } from "../../../Util"

describe("Has unique colours", () => {
    let testCases = [
        {
            piles: [],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Red, Flower.Lily)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Red, Flower.Lily)]),
                new Pile([cardWith(Colour.Yellow, Flower.Lily)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Red, Flower.Lily)]),
                new Pile([cardWith(Colour.Yellow, Flower.Lily)]),
                new Pile([cardWith(Colour.Yellow, Flower.Petunia)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Red, Flower.Lily)]),
                new Pile([cardWith(Colour.Blue, Flower.Lily)]),
                new Pile([cardWith(Colour.Yellow, Flower.Petunia)]),
            ],
            expectedReward: 5,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new HasUniqueColours(3, 5)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
